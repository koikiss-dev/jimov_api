import axios from "axios";
import * as ch from "cheerio";
import { Anime } from '../../../../utils/schemaProviders.js';

async function getAnime(anime) {
  //aplica minuscula y reemplaza espacios con -
  const animename = anime?.toLowerCase().replace(/\s/g, "-");

  try {
    const { data } = await axios.get(
      `https://www1.otakustv.com/anime/${animename}`
    );

    console.log(data);

    const $ = ch.load(data);

    const anime = new Anime();


    anime.name = $("div.inn-text h1.text-white").text();

    if ($("span.btn-anime-info").text().trim() == 'Finalizado') {
      anime.active = false;
    } else {
      anime.active = true;
    }

    
    anime.synopsis = $("div.modal-body").first().text().trim();
    anime.year = $("span.date")
      .text()
      .replace(" Estreno: ", "Se estreno: ");
    // anime.rate = $("div.none-otakus-a span.ml-1").text().replace("-", " -");

    //Aqui literalmente tuve que usar un each no mas para sacar una cosa,
    //literalmente no me dejo sacarlo a la primera dude wtf

    const stuff = $("div.img-in img ").each((i, j) => {
      if (i) anime.image = $(j).attr("src");
    });

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

    console.log(anime);

    return anime;
  } catch (error) {
    return error;
  }
}

getAnime('bocchi the rock');

export default { getAnime };
