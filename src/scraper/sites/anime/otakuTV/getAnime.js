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
      cover: "",
      totalEpisodes: "",
      description: "",
      dateRelease: "",
      rate: "",
      episodes_url: []
    }


    anime.title = $("div.inn-text h1.text-white").text();
    anime.status = $("span.btn-anime-info").text().trim();
    anime.totalEpisodes = $("div.episodios-top div.p-10-m span.text-white").text().replace("episodio(s)", "").trim();
    anime.description = $("div.modal-body").first().text().trim();
    anime.dateRelease = $("span.date").text().replace(" Estreno: ", "Se estreno: ");
    anime.rate = $("div.none-otakus-a span.ml-1").text().replace("-", " -");

    //Aqui literalmente tuve que usar un each no mas para sacar una cosa,
    //literalmente no me dejo sacarlo a la primera dude wtf

    const stuff = $("div.img-in img ").each((i, j) => {
      if (i)

        anime.cover = $(j).attr('src')
    });



    const getepisodesanime = $("div.tabs div.tab-content div.tab-pane div.pl-lg-4 div.container-fluid div.row div.col-6 ").each((i, j) => {
      anime.episodes_url.push({
        title: $(j).find("p").find("span").html(),
        url: $(j).find("a").attr("href"),
      })
    });



    return anime;


  } catch (error) {
    return error
  }


}







