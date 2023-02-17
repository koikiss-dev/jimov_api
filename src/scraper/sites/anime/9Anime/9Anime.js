import * as ch from "cheerio";
import axios from "axios";
import {
  Anime,
  EpisodeServer,
  Episode,
  Image,
} from "../../../../utils/schemaProviders.js";
import { parseAnimeInfo } from "./parse9AnimeInfo.js";

//url
const nineAnime = "https://9anime.to/";

async function NineAnimeInfo(anime) {
  try {
    const { data } = await axios.get(`${nineAnime}watch/${anime}`);
    const $ = ch.load(data);
    const anime_data = new Anime();
    anime_data.name = $("h1").text().trim();
    anime_data.image = $("div.poster span > img").attr("src");
    anime_data.alt_name = $("div.names").text().trim();
    anime_data.synopsis = $("div.content").text().trim();
    anime_data.url = `/anime/9anime/watch/${anime}`;

    $("div.binfo div.info div.bmeta").each((i, e) => {
      const info = parseAnimeInfo(
        $(e).find("div.meta:first").text().trim(),
        $(e).find("div.meta").next().text().trim()
      );
      anime_data.year = info.dateAired.trim();
      anime_data.genres = info.genre;
      anime_data.station = info.premiered.replace("Duration", "").trim();
      anime_data.active = info.status.trim();
      for (let i = info.episodes; i >= 1; i--) {
        anime_data.episodes.push(
          `/anime/9anime/watch/${anime.split("/")[0]}/ep-${i}`
        );
      }
    });
    $("section#w-related").each((i, e) => {
      anime_data.chronology.push({
        name: $(e).find("div.name").text().trim(),
        image: $(e).find("img").attr("src"),
        url: `/anime/9anime${$(e).find("a.item").attr("href")}`,
      });
    });
    return anime_data;
  } catch (error) {
    console.log(error);
  }
}

export default {NineAnimeInfo}

/**
 type: dataArray[0],
    studio: dataArray[1].replace('Date aired', ''),
    dateAired: dataArray[2],
    broadcast: dataArray[3].replace('Status: Releasing Genre:', ''),
    status: dataArray[3].match(/Status:\s(\w+)/)[1],
    genre: genreArray,
    country: dataArray[4].replace('Scores', '').trim() || null,
    score: parseFloat(dataArray[5].match(/([\d.]+)\sby/)[1]) || null,
    numReviews: parseInt(dataArray[5].match(/by\s([\d,]+)/)[1].replace(/,/g, '')) || null,
    premiered: dataArray[6].replace('Duration', '').trim() || null,
    duration: parseInt(dataArray[7]) || null,
    episodes: parseInt(dataArray[8]) || null,
    views: parseInt(dataArray[9].replace(/,/g, '')) || null,
 */
