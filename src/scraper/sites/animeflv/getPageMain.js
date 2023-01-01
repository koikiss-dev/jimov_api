import * as dotenv from "dotenv";
import axios from "axios";
import * as ch from "cheerio";
dotenv.config();

const url = process.env.URL; //-> https://www2.animeflv.bz

async function getLasEpisodes() {
  try {
    const { data } = await axios.get(url);
    const $ = ch.load(data);
    const last_episodes = [];
    const cards = $(".ListEpisodios li a"); //como en css para acceder a las clases hijas

    cards.each((i, e) => {
      const anime = { title: "", episode_title: "", image: "", link: "" };
      const l = $(e).attr("href");
      anime.title = $(e).children("strong").text().trim(); //children es para acceder a lo interno como arriba pero distinto, aca agarro del a para saltar al strong
      anime.episode_title = $(e).children("span").text().trim();
      anime.image = $(e).find(".picture").children().attr("src");
      anime.link = `/anime/episode${l}`
      last_episodes.push(anime);
    });
    return last_episodes;
  } catch (error) {}
}

async function getEmitAnime() {
  try {
    const { data } = await axios.get(url);
    const $ = ch.load(data);
    const emit_anime = [];
    const list = $(".ListSdbr li");

    list.each((i, e) => {
      const emit = { title: "", link: "" };
      emit.title = $(e).children("a").text().trim();
      emit.link = $(e).children("a").attr("href");
      emit_anime.push(emit);
    });
    return emit_anime;
  } catch (error) {}
}

async function getLastAdd() {
  try {
    const { data } = await axios.get(url);
    const $ = ch.load(data);
    let last_anime = [];
    const list_add = $(".ListAnimes li article a");

    list_add.each((i, e) => {
      const last = { title: "", type: "", link: "", image: "" };
      last.title = $(e).children("h3").text().trim();
      last.type = $(e).find(".Type").text().trim();
      last.link = $(e).attr("href");
      last.image = $(e)
        .children(".Image")
        .find("figure")
        .children("img")
        .attr("src");
      last_anime.push(last);
    });
    const hash = {};
    last_anime = last_anime.filter((o) =>
      hash[o.link] ? false : (hash[o.link] = true)
    ); //eliminar duplicados y vacios
    return last_anime;
  } catch (error) {
    console.log(error);
  }
}

export default { getLasEpisodes, getEmitAnime, getLastAdd };
