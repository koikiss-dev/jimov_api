import { IAnime } from "@animetypes/anime";
import { getHTML } from "./getHTML";



export async function getAllAnimes(url: string, numPage: number) {

    try {
    

    let animes: IAnime[] = [];
 
    let $ = await getHTML(
        `${url}?page=${numPage}`
      ); 

    
    let pageState = $(".anime_name h2").text(). 
        replace("ADVERTISEMENTSRECENT RELEASESeason", ""). 
        trim();

    if ( pageState != "404 Not found" ) { 

      $(".last_episodes ul li").each((_, element) => {


        let animeName = $(element).find("p.name").find("a"). 
          text(). 
          trim();

        
        let animeImage = $(element).find(".img").find("a").
              find("img").
              attr("src");

        let animeNameUrl= $(element).find(".img").find("a").
              attr("href"). 
              replace("/category/", ""); 
      
        let year: string | number = $(element).find("p.released"). 
          text(). 
          replace("Released: ", "");

        year = parseInt(year);

         animes.push({
            name: animeName,
            image: {
              url: animeImage
            },
            url: `/anime/gogoanime/name/${animeNameUrl}`,
            date: {
               begin: {
                  year: year,
                }
            }
          
          })


	    })

    }



  
    return animes

    } catch( error ){
	
      return error
    
     }
    

}
