import axios from "axios";
import * as ch from "cheerio";
import { AnimeSearch, SearchArray } from "../../../../utils/shemaProvidersExperimental.js";

const url = 'https://www2.animeflv.bz';

async function Filter(gen, year, type, status, ord, page) {
  try {
    const { data } = await axios.get(`${url}/browse`, {
      params: {
        genres: gen || "all",
        year: year || "all",
        status: status || "all", //En-emision, Finalizado, Proximamente
        Tipo: type || "all", //all, 1, 2, 3, 4
        order: ord || "1", //1, 2, 3, 4, 5
        page: page || "1",
      }, //parametros de animeflv
    });
    const $ = ch.load(data);
    const info = $("ul.ListAnimes li article.Anime div.Description");
    const data_anime = new SearchArray(page || "1")

    info.each((i, e) => {
      const info = new AnimeSearch($(e).find(".Title").last().text().trim(), $("figure").children("img").attr("src"), $(e).find("a").attr("href").replace('/anime', '/anime/flv'), $(e).find("p").children("span.Type").text().trim())
      data_anime.data.push(info)
    });

    return data_anime;
  } catch (error) {
    return false;
  }
}

export default { Filter };
