import axios from "axios";
import * as ch from "cheerio";
import { Anime } from '../../../../utils/schemaProviders.js';

async function getAnime(anime) {
  //Transform to minus and change spaces to -
  const animename = anime?.toLowerCase().replace(/\s/g, "-");

  try {
    const { data } = await axios.get(
      `https://www1.otakustv.com/anime/${animename}`
    );

    const $ = ch.load(data);

    const anime = new Anime();

    //gets name
    anime.name = $("div.inn-text h1.text-white").text();

    //Test its state
    if ($("span.btn-anime-info").text().trim() == 'Finalizado') {
      anime.active = false;
    } else {
      anime.active = true;
    }

    //get synopsis
    anime.synopsis = $("div.modal-body").first().text().trim();

    //gets year
    anime.year = $("span.date")
      .text()
      .replace(" Estreno: ", "Se estreno: ");


    //omits first thing and return its image
    const stuff = $("div.img-in img ").each((i, j) => {
      if (i) anime.image = $(j).attr("src");
    });

    //pushing episodes on its array
    const getEpisodes = $(
      "div.tabs div.tab-content div.tab-pane div.pl-lg-4 div.container-fluid div.row div.col-6 "
    ).each((i, j) => {
      anime.episodes.push({
        title: $(j).find("p").find("span").html(),
        url: $(j)
          .find("a")
          .attr("href")
      });
    });


    return anime;
  } catch (error) {
    return error;
  }
}


export default { getAnime };
