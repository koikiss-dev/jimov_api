import * as cheerio from "cheerio";
import axios from "axios";

export default async function getAnime(name){ 

  const animeparser = name.toLowerCase();
  const animename = animeparser.replace(/\s/g, "-");

  try {

    const { data } = await axios.get(`https://ww4.gogoanimes.org/category/${animename}`)
    const $ = cheerio.load(data);

    const title = $("div.anime_info_body_bg  h1").text();
    const url = $("div.anime_info_body_bg ").find("img").attr("src");
    const genre  = [];
    const stuff = [];
    const episodes = [];

    //Obtuve cosas por separado, asi que las dividi
    const getgenre = $("div.anime_info_body_bg p.type a").each((i, j) => {
      genre.push($(j).text().trim())
    })

    const getstuff = $("div.anime_info_body_bg p.type ").each((i, j) => {
      stuff.push($(j).text().trim())
    }) 

    const getepisodes = $("div.anime_video_body ul a").each((i, j) =>{
      episodes.push($(j).text());
    });
   

    let status = stuff[4].replace("Status: ", "")

    if(status != 'Completed'){
       status = "Not completed"
    }

    const description = stuff[1].replace("Plot Summary: ", "")
    const type = genre.shift();

   const anime = {
      title: title,
      description: description,
      url: url,
      episodes: episodes,
      status: status,
      type: type,
      genre: genre,
    } 

    return anime 


  } catch (error) {
    console.log(error) 
  }


}



