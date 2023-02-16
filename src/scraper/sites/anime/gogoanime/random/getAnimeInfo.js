import animeRandom from "./getAnimeUrlRandom.js";
import axios from "axios";
import * as ch from 'cheerio'
import { getAnimeInfo } from '../getAnimeInfo.js'

async function getAnime() {
  try {

    const getAnimeUrl = await animeRandom.getAnimeUrlRandom();

    const { data } = await axios.get(getAnimeUrl);
    const $ = ch.load(data);

  
    const getFetchAnime = await getAnimeInfo(null, getAnimeUrl);

    console.log(getFetchAnime);


  } catch (error) {
    return error
  }
}

getAnime();
