import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "../../../../utils/schemaProviders.js";



export default async function getAnime(name) {

  const animeparser = name.toLowerCase();
  const animename = animeparser.replace(/\s/g, "-");



  try {

    const { data } = await axios.get(`https://ww4.gogoanimes.org/category/${animename}#`)
    const $ = cheerio.load(data);

    const anime = new Anime();

    //name, image, url
    anime.name = $("div.anime_info_body_bg  h1").text();
    anime.image = $("div.anime_info_body_bg ").find("img").attr("src");
    anime.url = `https://ww4.gogoanimes.org/category/${animename}`;


    //Get synopsis, year
    $('div.anime_info_body_bg p.type').each((i, j) => {
      //Skips for first p.type
      if (i)

        // synopsis
        if (i == 1) {
          anime.synopsis = $(j).text().replace('Plot Summary: ', '').trim();
          // year
        } if (i == 3) {
          anime.year = $(j).text().replace('Released: ', '')
          //Status
        } if (i == 4 && $(j).text().trim() != 'Status: ') {
          anime.active = true;
        }
    })

    //Genre
    $('div.anime_info_body_bg p.type a').each((i, j) => {
      if (i)
        anime.genres.push($(j).text())
    })


    /*
    //Episodes
    $('.main_body .anime_video_body div#load_ep ul#load_ep').each((i, element) => {
      console.log($(element))
    })

    */

    console.log($('.anime_video_body ').html());



  } catch (error) {
    return error
  }


}


getAnime('bocchi the rock')
