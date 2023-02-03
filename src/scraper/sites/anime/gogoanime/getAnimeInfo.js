import * as cheerio from "cheerio";
import axios from "axios";


async function getAnime(name) {

  const animeparser = name.toLowerCase();
  const animename = animeparser.replace(/\s/g, "-");


  try {

    const anime = {
      title: "",
      title_alt: "",
      description: "",
      status: "",
      type: "",
      dateRelease: "",
      img: "",
      episodes: [],
      genres: []
    }

    const { data } = await axios.get(`https://ww4.gogoanimes.org/category/${animename}`)
    const $ = cheerio.load(data);

    anime.img = $("div.anime_info_body_bg").find('img').attr('src');
    anime.title = $("div.anime_info_body_bg h1").text();
    anime.type = $("div.anime_info_body_bg p ").first().find('a').text();

    const stuff = $("div.anime_info_body_bg p ").each((i, element) => {
      //Sorry for this, later i can get better     
      if (i == 1) {
        anime.description = $(element).text().trim().replace("Plot Summary: ", "")
      } if (i == 2) {
        anime.genres.push($(element).text().trim())
      } if (i == 3) {
        anime.dateRelease = $(element).text().trim().replace("Released:", "Date release:")
      } if (i == 4) {
        anime.status = $(element).text().trim()
      } if (i == 5) {
        anime.title_alt = $(element).text().trim().replace("Other name: ", "")
      }
    });


    const getEpisodes = $('#load_ep',  '.anime_video_body').html()
    

    console.log(getEpisodes)
    


    return anime;


  } catch (error) {
    return error;
  }



}

getAnime("dragon ball");

export default { getAnime }
