import { Manga, MangaChapter } from "../../../../types/manga";
import axios from "axios";
import { load } from "cheerio";
import { Image } from "../../../../types/image";

export class Manganato {
  readonly url = "https://manganato.com";
  readonly chapURL = "https://chapmanganato.com";
  readonly name = "manganato";

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

  private isNsfw(data: cheerio.Root) {
    const genres = this.GetMangaGenres(data);

    return genres.some(genre => genre === "Pornographic");
  }

  async GetMangaInfo(mangaId: string) {
    const { data } = await axios.get(`${this.chapURL}/manga-${mangaId}`);
    const $ = load(data);

    const manga = new Manga;

    const title = $("div.panel-story-info > div.story-info-right > h1").text().trim();
    const description = this.GetMangaDescription($);
    const thumbnail = $("div.panel-story-info > div.story-info-left > span.info-image > img").attr("src");
    const altTitle = $("table > tbody > tr:nth-child(1) > td.table-value > h2").text().trim();
    const status = this.GetMangaStatus($);
    const authors = this.GetMangaAuthors($);
    const genres = this.GetMangaGenres($);
    const chapters = $("div.panel-story-chapter-list").find("ul > li.a-h").map((_, element) => {
      const chapter = new MangaChapter;
      const url = $(element).find("a.chapter-name").attr("href");
      const chapterId = new URL(url).pathname.split("-").at(-1);

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
    manga.isNSFW = this.isNsfw($);

    return manga;
  }

  async Filter() {}

  async GetMangaChapters() {}
}
