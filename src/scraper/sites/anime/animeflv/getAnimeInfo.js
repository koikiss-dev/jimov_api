import axios from "axios";
import * as ch from "cheerio";

import {
  GetAnimeInfo
} from "../../../../utils/shemaProvidersExperimental.js";

const url = "https://www2.animeflv.bz";

async function animeInfo(anime) {
  try {
    const { data } = await axios.get(`${url}/anime/${anime}`, {
      timeout: 2000,
    });
    const $ = ch.load(data);
    const title = $("h2.Title").text().trim();
    const title_alt = $("span.TxtAlt").text().trim();
    const type = $("span.Type").text().trim();
    const img = $("div.AnimeCover .Image figure img").attr("src");
    const status = $("p.AnmStts span").text().trim();
    const synopsis = $("div.Description").text().trim();
    const episodes = $(".ListCaps li a");
    const anime_info = new GetAnimeInfo();

    anime_info.title = title;
    anime_info.type = type;
    anime_info.image = img;
    anime_info.synopsis[0].description = synopsis;
    anime_info.synopsis[0].status = status;

    //get genres
    const genres = $("nav.Nvgnrs a").each((i, e) => {
      const gen = $(e).text().trim();
      anime_info.synopsis[0].keywords.push(gen);
    });
    //getRelated
    const similar_anime = $("ul.ListAnmRel li a").each((i, e) => {
      const cro = new Cronology($(e).text().trim(), $(e).attr("href").replace("/anime", "/anime/flv"))
      anime_info.synopsis[0].chronology.push(cro);
    });
    //get episodes
    episodes.each((i, e) => {
      const l = $(e).attr("href");
      const episode = new Episode();
      episode.name = $(e).children(".Title").text().trim();
      episode.image = $(e).children("figure").find(".lazy").attr("src");
      episode.url = `/anime/episode${l}`.replace("/anime", "/anime/flv");
      episode.number =  $(e).children("p").last().text().trim()
      
      const data_anime = {};
      /*  const data_anime = {
        episode_title: $(e).children(".Title").text().trim(),
        episode_number: $(e).children("p").last().text().trim(),
        image_espisode: `/anime/episode${l}`.replace("/anime", "/anime/flv"),
        link_episode: $(e).children("figure").find(".lazy").attr("src"),
      }; */
      anime_info.episodes.push(episode);
    });
    return anime_info
  } catch (error) {
    return error;
  }
}


export default { animeInfo };
