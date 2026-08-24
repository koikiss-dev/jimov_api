import axios from "axios";
import { load } from "cheerio";
import {
  getFilterByPages,
  getFilterNumPages,
} from "./assets/getFilterByPage";
import {
  extractGalleryJson,
  getPageImages,
} from "./assets/galleryJson";
import {
  fetchGalleryPage,
  REQUEST_TIMEOUT,
} from "./assets/galleryClient";
import { PROVIDER_ID, SITE_URL } from "./assets/site";
import {
  type IMangaChapter,
  type IMangaResult,
  MangaChapter,
  MangaMedia,
} from "../../../../types/manga";

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
  url = `${SITE_URL}/search?q=`;

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
    const data = await fetchGalleryPage(mangaId);

    const $ = load(data);
    const gallery = extractGalleryJson(data);

    const manga = new MangaMedia();

    manga.id = mangaId;
    manga.url = `/manga/${PROVIDER_ID}/name/${mangaId}`;
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
  async getMangaChapters(mangaId: string): Promise<IMangaChapter[]> {
    const data = await fetchGalleryPage(mangaId);

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
    chapter.url = `/manga/${PROVIDER_ID}/chapter/1`;
    chapter.images = getPageImages(thumbnails, gallery?.images.pages);

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
