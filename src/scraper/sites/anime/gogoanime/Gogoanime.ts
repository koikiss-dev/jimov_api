import { getHTML } from "./assets/getHTML";
import { Anime } from "../../../../types/anime";
import { getAllAnimes } from "./assets/getAllAnimesHTML";
import { Episode } from "../../../../types/episode";


//This is a class
export class GogoanimeInfo {

  async getAnimeInfo(animeName: string) {

  try {
   
    const $ = await getHTML(`https://www3.gogoanimes.fi/category/${animeName}`);

    const anime = new Anime;

    anime.genres = [];

    anime.name = $("div.anime_info_body_bg  h1").text();

    anime.image = {
      url: $("div.anime_info_body_bg ").find("img").attr("src")
    }

    anime.alt_name = $("div.anime_info_body_bg").
      find("p").
      last().
      text().
      replace("Other name: ", "").
      trim();
    


    $("div.anime_info_body_bg p.type a").each((iterator, elementHTML) => {

      if (iterator)

      anime.genres.push($(elementHTML).html());

    })


  $('div.anime_info_body_bg p.type').each((index, element) => {
      //Skips for first p.type
      if (index)

        if (index == 1) {
          anime.synopsis = $(element).text().replace('Plot Summary: ', '').trim();
        } 
        
        if (index == 4 && $(element).text().trim() != 'Status: ') {
          anime.status = true;
        } 
        
        if (index == 5) {
          anime.alt_name = $(element).text().trim()
            .replace('Other name:', '')
            .replace(/\s/g, '')
        }
    })



    let getNumberEpisodes: any = $('#episode_page li').last().text().trim().split("-")[1];
    getNumberEpisodes = parseInt(getNumberEpisodes);

    for (let index = 1; index <= getNumberEpisodes; index++) {
      anime.episodes.push({
          name: `${animeName}-cap-${index}`,
          url: `/anime/gogoanime/episode/${animeName}/${index}`,//sorry for the change
          number: `${index}`,
          image: "That isn't image"
      })
    }

      return anime

     } catch(error) {
      return error;
    }


  }

}

export class GogoanimeFilter {

    async getAnimesfilterByGenre(genre: string, numPage: number) {


      let animesByGenre = await getAllAnimes(
      
      `https://www3.gogoanimes.fi/genre/${genre}`, numPage
    
    )


      return animesByGenre;

    }


  async filterBySeasons( season: string, year: string, numPage: number  ) {

    let animes = await getAllAnimes(
      `https://www3.gogoanimes.fi/sub-category/${season}-${year}-anime`, numPage
    );


    return animes
     
  }

}




export class GogoanimeServer {

  async getAnimeServerEpisode(animeName: string, episodeNumber: number) { 


    let serverUrl: string;
    let serverName: string;

    const $ = await getHTML(
        `https://www3.gogoanimes.fi/${animeName}-episode-${episodeNumber}`
    );

    const episode = new Episode();
   
    episode.name = "This isn't name";
    episode.servers  = [];
    

    
    $(".anime_muti_link ul li ").each((iterator, element) => { 


    if (iterator == 0 || iterator == 1){
   
       serverName = $(element).find("a").text(). 
          replace(" this server", "").trim();

        serverUrl = `http:${$(element).find("a").attr("data-video")}`;


      episode.servers.push({
          name: serverName,
          url: serverUrl
        });
    
    }if(iterator > 2) { 
    

       serverName = $(element).find("a").text(). 
          replace(" this server", "").trim();
      
       serverUrl = $(element).find("a").attr("data-video");


      episode.servers.push({
          name: serverName,
          url: serverUrl
        });

      }
    
    })

    return episode;
  }

}



