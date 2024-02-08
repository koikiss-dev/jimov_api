import { IMangaResult, Manga, MangaChapter } from "../../../../types/manga";
import axios from "axios";
import { load } from "cheerio";
import { Image } from "../../../../types/image";
import { ManganatoManagerUtils } from "./ManganatoManagerUtils";
import { IManganatoFilterParams } from "./ManganatoTypes";
import { ResultSearch } from "../../../../types/search";

export class Manganelo {
  private readonly url = "https://manganelo.tv"; //chapmanganelo.com //mangakakalot.tv;
  readonly name = "manganelo";
  private readonly manager = ManganatoManagerUtils.Instance;

  private GetMangaDescription(data: cheerio.Root) {
    if (
      data("div#panel-story-info-description").length == 0 &&
      data("div#panel-story-info-description h3").length == 0
    )
      return null;

    data("div#panel-story-info-description h3").remove();

    return data("div#panel-story-info-description").text().trim();
  }

  private GetMangaStatus(data: cheerio.Root) {
    const selector = data("div.panel-story-info > div.story-info-right > table > tbody > tr:nth-child(3) > td.table-value");

    if (selector.length == 0)
      return null;

    if (selector.text().trim() == "Ongoing")
      return "ongoing";
    else
      return "completed";
  }

  private GetMangaAuthors(data: cheerio.Root): string[] | null {
    const selector = data("div.panel-story-info > div.story-info-right > table > tbody > tr:nth-child(2) > td.table-value");

    if (selector.length == 0 && selector.find("a.a-h").length == 0)
      return null;

    return selector.find("a.a-h").map((_, element) => {
      return data(element).text().trim();
    }).get();
  }

  private GetMangaGenres(data: cheerio.Root): string[] | null {
    const selector = data("div.panel-story-info > div.story-info-right > table > tbody > tr:nth-child(4) > td.table-value");

    if (selector.length == 0 && selector.find("a.a-h").length == 0)
      return null;

    return selector.find("a.a-h").map((_, element) => {
      return data(element).text().trim();
    }).get();
  }

  private isNsfw(genres: string[]) {
    return genres.some(genre => genre === "Pornographic" || genre === "Mature" || genre === "Erotica");
  }

  private GetMangaPages(data: cheerio.Root) {
    if (data("div.container-chapter-reader").length == 0 && data("div.container-chapter-reader > img").length == 0)
      return null;

    return data("div.container-chapter-reader > img").map((_, element) => data(element).attr("data-src")).get();
  }

  private GetMangaSearchResults(data: cheerio.Root): IMangaResult[] | null {
    const section = data("div.panel-content-genres");
    if (section.length === 0)
      return null;

    return section.find("div.content-genres-item").map((_, element) => {
      const mangaResultId = data(element).find("a.genres-item-img").attr("href").split("-").at(-1);
      const name = data(element).find("a.genres-item-img").attr("title").trim();

      const mangaInfoResults: IMangaResult = {
        id: mangaResultId,
        title: name,
        url: `/manga/${this.name}/title/${mangaResultId}`
      }

      return mangaInfoResults;
    }).get();
  }

  async GetMangaInfo(mangaId: string) {
    const { data } = await axios.get(`${this.url}/manga/manga-${mangaId}`);
    const $ = load(data);

    const manga = new Manga;

    const title = $("div.panel-story-info > div.story-info-right > h1").text().trim();
    const description = this.GetMangaDescription($);
    const thumbnail = this.url + $("div.panel-story-info > div.story-info-left > span.info-image > img").attr("src");
    const altTitle = $("table > tbody > tr:nth-child(1) > td.table-value > h2").text().trim();
    const status = this.GetMangaStatus($);
    const authors = this.GetMangaAuthors($);
    const genres = this.GetMangaGenres($);
    const chapters = $("div.panel-story-chapter-list").find("ul > li.a-h").map((_, element) => {
      const chapter = new MangaChapter;
      const url = $(element).find("a.chapter-name").attr("href");

      const chapterId = url.substring(url.lastIndexOf("-") + 1);

      chapter.id = Number(chapterId);
      chapter.title = $(element).find("a.chapter-name").text().trim();
      chapter.url = `/manga/${this.name}/chapter/${mangaId}?num=${chapterId}`;
      chapter.number = Number(chapterId);
      chapter.images = null;

      return chapter;
    }).get();

    manga.id = mangaId;
    manga.url = `/manga/${this.name}/title/${mangaId}`;
    manga.title = title;
    manga.altTitles = Array.of(altTitle);
    manga.thumbnail = new Image(thumbnail);
    manga.description = description;
    manga.status = status;
    manga.authors = authors;
    manga.genres = genres;
    manga.characters = null;
    manga.chapters = chapters;
    manga.volumes = null;
    manga.isNSFW = this.isNsfw(genres);

    return manga;
  }

  async Filter(params: IManganatoFilterParams) {
    const url = this.manager.url.generate(params);

    const { data } = await axios.get(url);
    const $ = load(data);

    const mangaResultSearch = new ResultSearch<IMangaResult>();
    mangaResultSearch.results = this.GetMangaSearchResults($);

    return mangaResultSearch;
  }

  async GetMangaChapters(mangaId: string, chapterNumber: number) {
    const { data } = await axios.get(`${this.url}/chapter/manga-${mangaId}/chapter-${chapterNumber}`);
    const $ = load(data);

    const images = this.GetMangaPages($);
    const name = $("body > div.body-site > div:nth-child(1) > div.panel-breadcrumb > a").eq(-1).attr("title") || null;
    const chapter = new MangaChapter;

    chapter.id = Number(chapterNumber);
    chapter.title = name;
    chapter.url = `/manga/${this.name}/chapter/${mangaId}?num=${chapterNumber}`;
    chapter.number = Number(chapterNumber);
    chapter.images = images;

    return chapter;
  }
}
