import * as dotenv from "dotenv";
import * as ch from "cheerio";
import axios from "axios";
dotenv.config();

const url = 'https://manga-oni.com';

async function mangaoni_top(top_param) {
  /*get popular manga */
  /*
  *@params semana, mes
  */
  try {
    const { data } = await axios.get(`${url}/${top_param === undefined || "" ? "" : top_param}`);
    const $ = ch.load(data);
    const targets = $("div._135yj");

    const data_return = [];
    //const h = "https://manga-oni.com/manga/shaman-king-zero/";
    targets.each((i, e) => {
      const g = { name: "", img: "", ranking: "", link: ""};
      g.name = $(e).find("h2").text().trim();
      g.img = $(e).find("img").attr("data-src");
      g.ranking = $(e).find("div.rk").text().trim();
      g.link = `/${$(e).find("a").attr("href").split('/').filter(el => el !== '').splice(2).join('/')}`;
      data_return.push(g);
    });
    //console.log(h.split('/').filter(el => el !== '').splice(2));
    return data_return;
  } catch (error) {
    return error;
  }
}
mangaoni_top('').then((f) => {
  console.log(f);
});

export default {mangaoni_top}
