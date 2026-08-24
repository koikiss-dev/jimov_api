import axios from "axios";
import { load } from "cheerio";
import { getFilterByPages } from "./assets/getFilterByPage";
import {
  type IMangaChapter,
  type IMangaResult,
  MangaChapter,
  MangaMedia,
} from "../../../../types/manga";

export class Nhentai {
  async filter(mangaName: string): Promise<IMangaResult[]> {
    return new NhentaiFilter().filter(mangaName);
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

  async filter(mangaName: string): Promise<IMangaResult[]> {
    const { data } = await axios.get(`${this.url}${mangaName}`);

    const $ = load(data);

    let numPages = $("section.pagination a").length;

    if (numPages != 0) {
      numPages = numPages - 2;
    } else {
      numPages = 1;
    }

    return getFilterByPages(mangaName, numPages);
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
    const { data } = await axios.get(`https://nhentai.to/g/${mangaId}`);

    const $ = load(data);

    const manga = new MangaMedia();

    manga.id = mangaId;
    manga.url = `/manga/nhentai/name/${mangaId}`;
    const altName = $("div#info h2").text().trim();

    manga.name = $("div#info h1").text().trim();

    if (altName) {
      manga.alt_names = [altName];
    }
    manga.thumbnail = {
      url: $("div#cover a img").attr("src"),
    };
    manga.authors = this.getTags($, "/artist/");
    manga.characters = this.getTags($, "/character/");
    manga.genres = this.getTags($, "/tag/");
    manga.chapters = null;
    manga.volumes = null;
    manga.nsfw = true;

    return manga;
  }
}

class NhentaiGetMangaChapters {
  async getMangaChapters(mangaId: string): Promise<IMangaChapter[]> {
    const { data } = await axios.get(`https://nhentai.to/g/${mangaId}`);

    const $ = load(data);

    const mangaImagesPages: string[] = [];

    $("div#thumbnail-container .thumb-container a img ").each(
      (_, chapterImage) => {
        // The gallery page shows the thumbnail of each page (e.g.
        // '1t.webp'), removing the 't' suffix returns the image in
        // its original size.
        mangaImagesPages.push(
          $(chapterImage).attr("data-src").replace(/t\.(\w+)$/, ".$1")
        );
      }
    );

    const chapter = new MangaChapter();

    chapter.id = 1;
    chapter.num = 1;
    chapter.name = $("div#info h1").text().trim();
    chapter.url = "/manga/nhentai/chapter/1";
    chapter.images = mangaImagesPages;

    return [chapter];
  }
}
