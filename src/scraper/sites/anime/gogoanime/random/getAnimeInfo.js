import animeRandom from "./getAnimeUrlRandom.js";
import axios from "axios";
import * as ch from 'cheerio'

async function getAnime() {
  try {

    const getAnimeUrl = await animeRandom.getAnimeUrlRandom();
    console.log(getAnimeUrl)

    const { data } = await axios.get(getAnimeUrl);
    const $ = ch.load(data);

    const anime = {
      title: "",
      description: "",
      coverImg: "xd",
      type: "xd",
      status: "xd",
      genre: [],
      episodes: []
    }

    anime.title = $("div.anime_info_body_bg  h1").text();
    anime.coverImg = $("div.anime_info_body_bg ").find("img").attr("src");
    anime.

      console.log(anime.title)
    console.log(anime.coverImg)

  } catch (error) {
    return error
  }
}

getAnime();
