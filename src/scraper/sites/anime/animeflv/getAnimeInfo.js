import axios from "axios";
import * as ch from "cheerio";

import {
  GetAnimeInfo,
  EpisodeListShema,
  Cronology,
} from "../../../../utils/schemaProviders.js";

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
    anime_info.anime_title = title;
    anime_info.alternative_title = title_alt;
    anime_info.type = type;
    anime_info.anime_image = img;
    anime_info.synopsis[0].status = status;
    anime_info.synopsis[0].description = synopsis;

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
      const episode = new EpisodeListShema(
        $(e).children(".Title").text().trim(),
        $(e).children("p").last().text().trim(),
$(e).children("figure").find(".lazy").attr("src")
        `/anime/episode${l}`.replace("/anime", "/anime/flv"),
      );
      const data_anime = {};
      /*  const data_anime = {
        episode_title: $(e).children(".Title").text().trim(),
        episode_number: $(e).children("p").last().text().trim(),
        image_espisode: `/anime/episode${l}`.replace("/anime", "/anime/flv"),
        link_episode: $(e).children("figure").find(".lazy").attr("src"),
      }; */
      anime_info.episode_list.push(episode);
    });
    return anime_info
  } catch (error) {
    return error;
  }
}

animeInfo("majutsushi-orphen-hagure-tabi-urbanramahen").then((f) => {
  console.log(f);
});

export default { animeInfo };
