import axios from "axios";
import { load } from "cheerio";
import {
  getFilterByPages,
  getFilterNumPages,
} from "./assets/getFilterByPage";
import {
  type IMangaChapter,
  type IMangaResult,
  MangaChapter,
  MangaMedia,
} from "../../../../types/manga";

const REQUEST_TIMEOUT = 15000;

/**
 * Extension of the images hosted on the CDN according to the type
 * reported for each page of the gallery.
 */
const IMAGE_EXTENSIONS: Record<string, string> = {
  j: "jpg",
  p: "png",
  g: "gif",
  w: "webp",
};

interface GalleryJson {
  media_id: string;
  title: {
    english?: string;
    japanese?: string;
    pretty?: string;
  };
  images: {
    pages: Record<string, { t: string }>;
  };
  upload_date?: number;
  tags?: { type: string; name: string }[];
}

/**
 * The gallery page embeds the complete gallery information inside a
 * script as 'new N.gallery({...})'. This function extracts and parses
 * that object; the raw json is not strictly standard (it may contain
 * trailing commas), so it is cleaned up before parsing.
 */
function extractGalleryJson(html: string): GalleryJson | null {
  const marker = "new N.gallery(";
  const start = html.indexOf(marker);

  if (start === -1) return null;

  let open = start + marker.length;

  while (open < html.length && /\s/.test(html[open])) open++;

  if (html[open] !== "{") return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = open; index < html.length; index++) {
    const char = html[index];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
    } else if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;

      if (depth === 0) {
        try {
          const raw = html.slice(open, index + 1);
          return JSON.parse(raw.replace(/,\s*([}\]])/g, "$1"));
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

export class Nhentai {
  async filter(
    mangaName: string,
    page?: number
  ): Promise<IMangaResult[]> {
    return new NhentaiFilter().filter(mangaName, page);
  }

  async getMangaInfo(mangaId: string): Promise<MangaMedia> {
    return new NhentaiMangaInfo().getMangaInfoById(mangaId);
  }

  async getMangaChapters(mangaId: string): Promise<IMangaChapter[]> {
    return new NhentaiGetMangaChapters().getMangaChapters(mangaId);
  }
}

class NhentaiFilter {
  url = "https://nhentai.to/search?q=";

  private async fetchSearchPage(
    mangaName: string,
    page: number
  ): Promise<string> {
    const query = encodeURIComponent(mangaName);
    const suffix = page > 1 ? `&page=${page}` : "";

    const { data } = await axios.get(`${this.url}${query}${suffix}`, {
      timeout: REQUEST_TIMEOUT,
    });

    return data;
  }

  async filter(mangaName: string, page?: number): Promise<IMangaResult[]> {
    // The first page is downloaded once and reused: it is either the
    // requested page or the page where the total number of result
    // pages is read.
    const firstPage = await this.fetchSearchPage(mangaName, page ?? 1);
    const $ = load(firstPage);

    if (page) {
      return getFilterByPages($);
    }

    const numPages = getFilterNumPages($);

    const searchResults = getFilterByPages($);

    for (let index = 2; index <= numPages; index++) {
      const nextPage = load(await this.fetchSearchPage(mangaName, index));
      searchResults.push(...getFilterByPages(nextPage));
    }

    return searchResults;
  }
}

class NhentaiMangaInfo {
  /**
   * Get the tag names of a field of the gallery ('Artists',
   * 'Characters', 'Tags', etc) identified by the prefix of the link of
   * each tag.
   */
  private getTags($: cheerio.Root, hrefPrefix: string): string[] {
    return $("section#tags")
      .find(`a[href^="${hrefPrefix}"] span.name`)
      .map((_, element) => $(element).text())
      .get();
  }

  async getMangaInfoById(mangaId: string): Promise<MangaMedia> {
    const { data } = await axios.get(`https://nhentai.to/g/${mangaId}`, {
      timeout: REQUEST_TIMEOUT,
    });

    const $ = load(data);
    const gallery = extractGalleryJson(data);

    const manga = new MangaMedia();

    manga.id = mangaId;
    manga.url = `/manga/nhentai/name/${mangaId}`;
    manga.thumbnail = {
      url: $("div#cover a img").attr("src"),
    };

    if (gallery) {
      manga.name =
        gallery.title.english || gallery.title.pretty || "";

      if (gallery.title.japanese) {
        manga.alt_names = [gallery.title.japanese];
      }

      const tagsOfType = (type: string) =>
        (gallery.tags ?? [])
          .filter((tag) => tag.type === type)
          .map((tag) => tag.name);

      manga.authors = tagsOfType("artist");
      manga.characters = tagsOfType("character");
      manga.genres = tagsOfType("tag");
    } else {
      // Fallback to the DOM structure of the page
      manga.name = $("div#info h1").text().trim();

      const altName = $("div#info h2").text().trim();

      if (altName) {
        manga.alt_names = [altName];
      }

      manga.authors = this.getTags($, "/artist/");
      manga.characters = this.getTags($, "/character/");
      manga.genres = this.getTags($, "/tag/");
    }

    manga.chapters = null;
    manga.volumes = null;
    manga.nsfw = true;

    return manga;
  }
}

class NhentaiGetMangaChapters {
  /**
   * The gallery page shows the thumbnail of each page (e.g. '1t.webp').
   * The embedded gallery object reports the real type of every page of
   * the gallery in ascending order, allowing the exact url of each
   * image in its original size to be built.
   */
  private getPageImages(
    thumbnails: string[],
    gallery: GalleryJson | null
  ): string[] {
    const extensions = gallery
      ? Object.keys(gallery.images.pages)
          .map(Number)
          .sort((a, b) => a - b)
          .map((key) => IMAGE_EXTENSIONS[gallery.images.pages[key].t])
      : [];

    return thumbnails.map((thumbnail, index) => {
      const image = thumbnail.replace(/\/(\d+)t\.\w+$/, "/$1");

      return index < extensions.length && extensions[index]
        ? `${image}.${extensions[index]}`
        : `${image}.${thumbnail.match(/t\.(\w+)$/)?.[1] ?? "jpg"}`;
    });
  }

  async getMangaChapters(mangaId: string): Promise<IMangaChapter[]> {
    const { data } = await axios.get(`https://nhentai.to/g/${mangaId}`, {
      timeout: REQUEST_TIMEOUT,
    });

    const $ = load(data);
    const gallery = extractGalleryJson(data);

    const thumbnails: string[] = [];

    $("div#thumbnail-container .thumb-container a img").each(
      (_, chapterImage) => {
        const src = $(chapterImage).attr("data-src");

        if (src) thumbnails.push(src);
      }
    );

    const chapter = new MangaChapter();

    chapter.id = 1;
    chapter.num = 1;
    chapter.name =
      gallery?.title.english ||
      gallery?.title.pretty ||
      $("div#info h1").text().trim();
    chapter.url = "/manga/nhentai/chapter/1";
    chapter.images = this.getPageImages(thumbnails, gallery);

    if (gallery?.upload_date) {
      const date = new Date(gallery.upload_date * 1000);

      chapter.date = {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
      };
    }

    return [chapter];
  }
}
