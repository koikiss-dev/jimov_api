import axios from "axios";
import * as ch from "cheerio";
import { Anime, Episode, Chronology } from "../../../../utils/schemaProviders.js";

const url = "https://www2.animeflv.bz";

async function animeInfo(anime) {
  try {
    const { data } = await axios.get(`${url}/anime/${anime}`, {
      timeout: 2000,
    });
    const $ = ch.load(data);
    const title = $("h2.Title").text().trim();
    const title_alt = $("span.TxtAlt").text().trim();
    const img = $("div.AnimeCover .Image figure img").attr("src");
    const status = $("p.AnmStts span").text().trim();
    const synopsis = $("div.Description").text().trim();
    const episodes = $(".ListCaps li a");
    const anime_info = new Anime();

    anime_info.name = title;
    anime_info.image = img;
    anime_info.synopsis = synopsis;
    anime_info.active = status;
    anime_info.alt_name = title_alt;
    anime_info.url = `/anime/flv/${anime}`

    //get genres
    const genres = $("nav.Nvgnrs a").each((i, e) => {
      const gen = $(e).text().trim();
      anime_info.genres.push(gen)
    });
    //getRelated
    const similar_anime = $("ul.ListAnmRel li a").each((i, e) => {
      const cro = new Chronology($(e).text().trim(), $(e).attr("href").replace("/anime", "/anime/flv"))
      anime_info.chronology.push(cro);
    });
    //get episodes
    episodes.each((i, e) => {
      const l = $(e).attr("href");
      const episode = new Episode();
      episode.name = $(e).children(".Title").text().trim();
      episode.image = $(e).children("figure").find(".lazy").attr("src");
      episode.url = `/anime/episode${l}`.replace("/anime", "/anime/flv");
      episode.number =  $(e).children("p").last().text().trim()
      anime_info.episodes.push(episode);
    });
    return anime_info
  } catch (error) {
    return error;
  }
}

/* animeInfo('one-piece-tv').then(f => {
  console.log(f)
}) */

export default { animeInfo };
