import axios from 'axios';
import random from './getUrlRandom.js'
import * as ch from 'cheerio';
import { getRandomInt } from './getRandomIntegers.js';


async function getAnimeUrlRandom() {
  const getUrl = await random.getRandom();

  const { data } = await axios.get(`${getUrl}`)
  const animes = [];

  const $ = ch.load(data);

  // const animeNames = $("div.anime_list_body ul li ").text().trim();
  const animeUrls = $("div.anime_list_body ul li").each((i, j) => {
    const url = $(j).find('a').attr('href')
    animes.push(
      `https://ww4.gogoanimes.org${url}`
    )
  });

  const getInt = getRandomInt(animes.length, 0);

  return animes[getInt]

}

getAnimeUrlRandom()


export default { getAnimeUrlRandom }


