import axios from "axios";
import { load } from "cheerio";
import { Manga } from "../../../../types/manga";
//import { IResultSearch } from "@animetypes/search";

export class MangaPark {
  readonly url = "https://v2.mangapark.net";

  async GetMangaInfo(mangaid: string) {
    try {
      const { data } = await axios.get(`${this.url}/title/${mangaid}`);
      const $ = load(data);
      const DataReturn = new Manga();
      //title, description, general
      DataReturn.title = $("div.text-base-content.comic-detail h3 > a")
        .text()
        .trim();
      DataReturn.altTitles = [];
      DataReturn.genres = [];
      DataReturn.thumbnail = {
        url: $("img.w-full.not-prose.shadow-md").attr("src")
      }
      $("div.text-base-content.comic-detail div.mt-1.opacity-80 span").each(
        (_i, e) => {
          DataReturn.altTitles.push($(e).text().trim());
        }
      );

      //gernes
      $(
        "div.text-base-content.comic-detail div.mt-5.flex.flex-col div.grow.flex.flex-col.mt-5 div.mt-5.space-y-2 div.flex.items-center.flex-wrap span"
      ).each((_i, e) => {
        DataReturn.genres.push(
          $(e).find("span").text().trim().replace(",", "")
        );
      });

      //format
      DataReturn.altTitles = DataReturn.altTitles.filter(
        (title) => title !== "/"
      );
      DataReturn.genres = DataReturn.genres.filter((gen) => gen !== "");
      return DataReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async Filter() {}

  async GetMangaChapters() {}
}

const h = new MangaPark();
h.GetMangaInfo("121068-kimetsu-no-yaiba").then((f) => {
  console.log(f);
});
