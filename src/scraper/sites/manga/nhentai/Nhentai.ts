import axios from "axios";
import { load } from "cheerio";
import { getFilterByPages } from "./assets/getFilterByPage";
import { IMangaChapter, Manga } from "../../../../types/manga";

export class Nhentai {
  async filter(mangaName: string) {
    return new NhentaiFilter().filter(mangaName);
  }

  async getMangaInfo(mangaId: string) {
    return new NhentaiMangaInfo().getMangaInfoById(mangaId);
  }

  async getMangaChapters(mangaId: string) {
    return new NhentaiGetMangaChapters().getMangaChapters(mangaId);
  }
}

class NhentaiFilter {
  url = "https://nhentai.to/search?q=";

  async filter(mangaName: string) {
    try {
      const { data } = await axios.get(`${this.url}${mangaName}`);

      const $ = load(data);

      let numPages = $("section.pagination a").length;

      if (numPages != 0) {
        numPages = numPages - 2;
      } else {
        numPages = 1;
      }

      const getResults = await getFilterByPages(mangaName, numPages);

      return getResults;
    } catch (error) {
      throw error;
    }
  }
}

class NhentaiMangaInfo {
  async getMangaInfoById(mangaId: string) {
    try {
      const { data } = await axios.get(`https://nhentai.to/g/${mangaId}`);
      
      const $ = load(data);

      const manga = new Manga();

      manga.characters = [];
      manga.authors = [];
      manga.chapters = [];


      manga.title = $("div#info h1").text();
      manga.thumbnail = {
        url: $("div#cover a img").attr("src"),
      };

      manga.id = mangaId;
      manga.isNSFW = true;

      const chracters = $("section#tags .tag-container").get(1);
      const autors = $("section#tags .tag-container").get(3);

      $(autors)
        .find("span a span.name")
        .each((_, elementCheerio) => {
          manga.authors.push($(elementCheerio).text());
        });

      $(chracters)
        .find("span a span.name")
        .each((_, elementCheerio) => {
          manga.characters.push($(elementCheerio).text());
        });

      return manga;
    } catch (error) {
      throw error;
    }
  }
}

class NhentaiGetMangaChapters {
  async getMangaChapters(mangaId: string): Promise<IMangaChapter[]> {
    try {
      const { data } = await axios.get(`https://nhentai.to/g/${mangaId}`);

      const $ = load(data);

      const mangaChapters: IMangaChapter[] = [];

      const mangaImagesPages: string[] = [];

      $("div#thumbnail-container .thumb-container a img ").each(
        (_, chapterImage) => {
          mangaImagesPages.push(
            $(chapterImage)
              .attr("data-src")
              .replace("cdn.dogehls.xyz", "t7.nhentai.net"),
          );
        },
      );

      mangaChapters.push({
        title: "it doesn't",
        number: 1,
        cover: "it doesn't",
        url: "/manga/nhentai/chapter/1",
        id: 1,
        images: mangaImagesPages,
      });

      return mangaChapters;
    } catch (error) {
      throw error;
    }
  }
}
