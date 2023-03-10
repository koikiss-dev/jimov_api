import { load } from "cheerio";
import axios from "axios";
import { Anime } from "../../../../utils/schemaProviders.js";
import { parseAnimeInfo } from "./parse9AnimeInfo.js";

const NINE_ANIME_URL = "https://9anime.to/";

async function getAnimeData(animeName) {
  try {
    const { data } = await axios.get(`${NINE_ANIME_URL}watch/${animeName}`);
    return load(data);
  } catch (error) {
    console.log(error);
  }
}

function getEpisodes(animeName, numEpisodes) {
  const episodes = [];
  for (let i = numEpisodes; i >= 1; i--) {
    episodes.push(`/anime/9anime/watch/${animeName.split("/")[0]}/ep-${i}`);
  }
  return episodes;
}

function getRelatedAnime($, anime_data) {
  $("section#w-related").each((i, e) => {
    anime_data.chronology.push({
      name: $(e).find("div.name").text().trim(),
      image: $(e).find("img").attr("src"),
      url: `/anime/9anime${$(e).find("a.item").attr("href")}`,
    });
  });
}

async function NineAnimeInfo(animeName) {
  const $ = await getAnimeData(animeName);
  const animeData = new Anime();

  animeData.name = $("h1").text().trim();
  animeData.image = $("div.poster span > img").attr("src");
  animeData.alt_name = $("div.names").text().trim();
  animeData.synopsis = $("div.content").text().trim();
  animeData.url = `/anime/9anime/name/${animeName}`;

  $("div.binfo div.info div.bmeta").each((i, e) => {
    const info = parseAnimeInfo(
      $(e).find("div.meta:first").text().trim(),
      $(e).find("div.meta").next().text().trim()
    );
    animeData.year = info.dateAired.trim();
    animeData.genres = info.genre;
    animeData.station = info.premiered.replace("Duration", "").trim();
    animeData.active = info.status.trim();
    animeData.episodes = getEpisodes(animeName, info.episodes);
  });

  getRelatedAnime($, animeData);

  return animeData;
}

export default { NineAnimeInfo };

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
