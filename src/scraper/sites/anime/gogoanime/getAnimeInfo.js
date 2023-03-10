import * as cheerio from "cheerio";
import axios from "axios";
import { Anime, Image } from "../../../../utils/schemaProviders.js";

export async function getAnimeInfo(name = null, url = null) {

  let url_fetch = "";
  let animeparser = "";
  let animename = "";


  if (name != null) {

    animeparser = name.toLowerCase();
    animename = animeparser.replace(/\s/g, "-").toLowerCase();

    url_fetch = `https://ww4.gogoanimes.org/category/${animename}`

  } else if (url != null) {

    url_fetch = url;
    let getEndpointsArray = splitString(`${url_fetch}`, "/")
    animename = getEndpointsArray[getEndpointsArray.length - 1];

  }


  try {

    const { data } = await axios.get(`${url_fetch}`)
    const $ = cheerio.load(data);

    const anime = new Anime();

    //name, image, url
    anime.name = $("div.anime_info_body_bg  h1").text();
    anime.image = new Image($("div.anime_info_body_bg ").find("img").attr("src"));
    anime.url = `/anime/gogoanime/${animename}`;


    //Get synopsis, year
    $('div.anime_info_body_bg p.type').each((index, element) => {
      //Skips for first p.type
      if (index)

        // synopsis
        if (index == 1) {
          anime.synopsis = $(element).text().replace('Plot Summary: ', '').trim();
          // year
        } if (index == 3) {
          anime.year = $(element).text().replace('Released: ', '')
          //Status
        } if (index == 4 && $(element).text().trim() != 'Status: ') {
          anime.active = true;
        } if (index == 5) {
          anime.alt_name = $(element).text().trim()
            .replace('Other name:', '')
            .replace(/\s/g, '')
        }
    })

    //Genre
    $('div.anime_info_body_bg p.type a').each((index, element) => {
      if (index)
        anime.genres.push($(element).text())
    })

    //Get numbers from html 
    let getNumberEpisodes = $('#episode_page li').last().text().trim().split("-")[1];
    getNumberEpisodes = parseInt(getNumberEpisodes)

    for (let index = 1; index <= getNumberEpisodes; index++) {
      anime.episodes.push({
        episode: `/anime/gogoanime/name/${animename}/episode/${index}`
      })
    }


    return anime


  } catch (error) {
    return error
  }

}




