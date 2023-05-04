import axios from "axios";
import { load } from "cheerio";
import { Manga, IMangaChapter, IMangaResult } from "../../../../types/manga";
import { IResultSearch } from "@animetypes/search";
export class MangaBuddy {
  readonly url = "https://mangabuddy.com";

  async GetMangaInfo(title: string) {
    try {
      const { data } = await axios.get(`${this.url}/${title}`, {
        headers: {
          Referer: "https://mangabuddy.com/",
        },
      });
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
      mangaReturn.url = `/manga/mangabuddy/title/${title}`;
      mangaReturn.altTitles = [...altTitles];
      mangaReturn.thumbnail = {
        url: `https://thumb.youmadcdn.xyz/thumb/${title}.png`, //acces denied
      };
      mangaReturn.genres = [];
      mangaReturn.chapters = [];

      //genres
      $('p:contains("Genres")')
        .find("a")
        .each((_, element) => {
          const genre = $(element).text().trim().replace(/[\n,]/g, "").trim();
          if (genre !== "") {
            mangaReturn.genres.push(genre);
          }
        });

      $("div#chapter-list-inner ul.chapter-list li").each((_i, e) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]; //months

        const dateText = $(e).find("time.chapter-update").text().trim(); //date string
        const yearMangaVerification = Number.isNaN(
          Number(dateText.split(" ")[2])
        );
        const dayMangaVerification = Number.isNaN(
          Number(dateText.split(" ")[0])
        );

        let monthAbbr;
        if (yearMangaVerification) {
          const d = new Date();
          monthAbbr = monthNames[d.getMonth()];
        } else {
          const monthStr = dateText.split(" ")[0];
          const monthNum = monthNames.findIndex((m) => m.startsWith(monthStr));
          monthAbbr = monthNames[monthNum];
        }

        const titleChapter = $(e)
          .find("a")
          .attr("title")
          .split("-")[1]
          .toLowerCase()
          .trim()
          .replace(" ", "-");
        const chapterList: IMangaChapter = {
          title: title.toUpperCase(),
          id: titleChapter,
          url: `/manga/mangabuddy/chapter/${title}-${titleChapter}`,
          number: Number($(e).find("strong").text().trim().split(" ")[1]),
          images: ["No images"],
          cover: "No cover",
          date: {
            year: yearMangaVerification
              ? new Date().getFullYear()
              : Number(dateText.split(" ")[2]),
            day: dayMangaVerification
              ? Number(dateText.split(" ")[1].replace(",", ""))
              : Number(dateText.split(" ")[0]),
            month: monthAbbr,
          },
        };
        mangaReturn.chapters.push(chapterList);
      });
      return mangaReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async Filter(genre?: string, status?: string, sort?: string, title?: string) {
    try {
      const { data } = await axios.get(`${this.url}/search`, {
        params: {
          genre: genre,
          status: status || "all",
          sort: sort,
          q: title,
        },
        headers: {
          Referer: "https://mangabuddy.com/",
        },
      });
      const $ = load(data);

      const ItemList: IResultSearch<IMangaResult> = {
        results: [],
      };

      $("div.manga-list div.book-item").each((_i, e) => {
        const ItemCard: IMangaResult = {
          title: $(e).find("h3 > a").attr("title"),
          url: `/manga/mangabuddy/title/${$(e)
            .find("h3 > a")
            .attr("href")
            .replace("/", "")}`,
          id: "No ID",
          thumbnail: {
            url: $(e).find("img").attr("data-src"),
          },
        };
        ItemList.results.push(ItemCard);
      });
      return ItemList;
    } catch (error) {
      console.log(error);
    }
  }

  async GetMangaChapters() {}
}

const m = new MangaBuddy();
m.Filter("", "", "", "one piece").then((f) => console.log(f));
