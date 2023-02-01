import * as dotenv from "dotenv";
import * as ch from "cheerio";
import axios from "axios";
dotenv.config();

const url = "https://manga-oni.com";

async function filter_manga(gen, status, fil, type, adult, order, page) {
  try {
    const { data } = await axios.get(`${url}/directorio`, {
      params: {
        genero: gen,
        estado: status,
        filtro: fil,
        tipo: type,
        adulto: adult,
        orden: order,
        p: page
      },
    });
    const $ = ch.load(data);
    const targets = $("div._135yj");

    const data_return = [
        {page: page || 1}
    ];

    targets.each((i, e) => {
      const g = { name: "", img: "", type: "", link: "", description: "" };
      g.name = $(e).find("span._1A2Dc").text().trim();
      g.img = $(e).find('img').attr('data-src');
      g.type = $(e).find('b.c0').text().trim()
      g.link = `/${$(e).find("a").attr("href").split('/').filter(el => el !== '').splice(2).join('/')}`
      g.description = $(e).find('div._2y8kd').text().trim()
      data_return.push(g);
    });
    return data_return
  } catch (error) {
    return error
  }
}

filter_manga(6, 1, "id", false, 0, "desc", 1).then((f) => {
  console.log(f);
});

export default {filter_manga}
