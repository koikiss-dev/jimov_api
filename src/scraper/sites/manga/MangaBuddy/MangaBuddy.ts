import axios from "axios";
import { load } from "cheerio";
import { Manga } from "../../../../types/manga";
export class MangaBuddy {
  readonly url = "https://mangabuddy.com";

  async GetMangaInfo(title: string) {
    try {
      const { data } = await axios.get(`${this.url}/${title}`);
      const $ = load(data);
      const titleManga = $("div.book-info div.detail div.name h1")
        .text()
        .trim();
      const altTitles = $("div.book-info div.detail div.name h2")
        .text()
        .trim()
        .split(";");
      const mangaReturn = new Manga();

      //details
      mangaReturn.title = titleManga;
      mangaReturn.altTitles = [...altTitles];
      mangaReturn.thumbnail = {
        url: `https://thumb.youmadcdn.xyz/thumb/${title}.png`, //acces denied
      };
      mangaReturn.genres = [];

      //genres
      $('p:contains("Genres")')
        .find("a")
        .each((_, element) => {
          const genre = $(element).text().trim().replace(/[\n,]/g, "").trim();
          if (genre !== "") {
            mangaReturn.genres.push(genre);
          }
        });

      return mangaReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async Filter() {}

  async GetMangaChapters() {}
}

const m = new MangaBuddy();
m.GetMangaInfo("mashle").then((f) => console.log(f));
