import axios from "axios";
import * as ch from "cheerio";

async function getAnime(anime) {

  //aplica minuscula y reemplaza espacios con -
  const animename = anime.toLowerCase().replace(/\s/g, "-");


  try {

    const { data } = await axios.get(`https://www1.otakustv.com/anime/${animename}`);
    const $ = ch.load(data);

    const anime = {
      // url: "",
      title: "",
      status: "",
      episodes: "",
      description: "",
      dateRelease: "",
      rate: "",
      episodes_url: []
    }

    /*
     * Esto no trae la url, trae un icono svg de play...
     * ahi te lo dejo por si quieres continuarlo :3
     * anime.url = $("div.img-in").first().find("img").attr("src");
    */

    anime.title = $("div.inn-text h1.text-white").text();
    anime.status = $("span.btn-anime-info").text();
    anime.totalEpisodes = $("div.episodios-top div.p-10-m span.text-white").text().replace("episodio(s)", "");
    anime.description = $("div.modal-body").first().text();
    anime.dateRelease = $("span.date").text().replace(" Estreno: ", "");
    anime.rate = $("div.none-otakus-a span.ml-1").text();

    const getepisodesurl = $("div.tabs div.tab-content div.tab-pane div.pl-lg-4 div.container-fluid div.row div.col-6 ").each((i, j) => {
      anime.episodes_url.push({
        title: $(j).find("p").find("span").html(),
        url: $(j).find("a").attr("href"),
      })
    });


    // console.log($("div.img-in img[class=d-inline-block]").html());


    console.log(anime.title)
    console.log(anime.status)
    console.log(anime.totalEpisodes)
    console.log(anime.description);
    console.log(anime.dateRelease);
    console.log(anime.rate);
    console.log(anime.episodes_url)

    return anime;


  } catch (error) {
    console.log(error);
  }


}

getAnime("bocchi the rock");







