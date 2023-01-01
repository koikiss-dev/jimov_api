import * as dotenv from "dotenv";
import axios from "axios";
import * as ch from "cheerio";
dotenv.config();

const url = process.env.URL;

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
    const data_filter = [{ page: page || "1" }];

    info.each((i, e) => {
      const return_object = { title: "", img: "", type: "", link: "" };
      return_object.title = $(e).find(".Title").last().text().trim();
      return_object.img = $("figure").children("img").attr("src");
      return_object.type = $(e).find("p").children("span.Type").text().trim();
      return_object.link = $(e).find("a").attr("href");
      data_filter.push(return_object);
    });

    return data_filter;
  } catch (error) {
    return false;
  }
}

export default { Filter };
