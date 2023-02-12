import axios from "axios";
import * as ch from "cheerio";
import {
  GetAnimeInfo
} from "../../../../utils/shemaProvidersExperimental.js";

const url_zoro = "https://zoro.to";

async function AnimeInfo(id) {
  const error_page = [
    {
      error: "Invalid or incompleted param",
      valids_params: ["top-viewed-day", "top-viewed-week", "top-viewed-month"],
      code: 404,
      value: false,
    },
  ];
  try {
    const { data } = await axios.get(`${url_zoro}/${id}`);

    const $ = ch.load(data);
    const anisc_info = []; //datos que tienen la misma clase por lo tanto es confuzo acceder sin hacer tanto desorden
    const anime = new GetAnimeInfo();

    $("div.anisc-info div.item-title").each((i, e) => {
      const data_span = $(e).children("span.name").text().trim();
      const data_a = $(e).children("a.name").text().trim();
      anisc_info.push(data_span, data_a);
    });

    const with_out_spaces = anisc_info.filter((el) => el !== ""); //eliminar espacios innecesarios del array anisc_info

    /*titulo y descripcion */
    anime.title = $("h2.film-name").text().trim();
    anime.synopsis[0].description = $("div.film-description div.text").text().trim();
    anime.image = $("img.film-poster-img").attr("src");
    anime.alternative_title.push(with_out_spaces[0]);
    anime.synopsis[0].status = with_out_spaces[5];
    anime.synopsis[0].premiere = with_out_spaces[2];
    //const play = $("div.film-buttons").find("a.btn-play").attr("href");
    /*titulo y descripcion */

    /* const information = [
      {
        title: title,
        img: image,
        watch: play,
        alt_title: with_out_spaces[0],
        Synonyms: with_out_spaces[1],
        aired: with_out_spaces[2],
        duration: with_out_spaces[4],
        status: with_out_spaces[5],
        mal_score: with_out_spaces[6], 
        studios: with_out_spaces[7],
        recommendations: [],
        related_anime: [],
        characters: [],
        synopsis: [
          {
            tags: [],
            link_tags: [],
            description: description,
          },
        ],
      },
    ]; */
    $("div.anisc-info div.item-list a").each((i, e) => {
      const gen = $(e).text().trim();
      anime.synopsis[0].keywords.push(gen);
      //information[0].synopsis[0].link_tags.push(link);
    });

    $("div.anif-block-ul ul li").each((i, e) => {
      const cronology = {
        title:$(e).find("h3.film-name").children("a").text().trim(),
        link: `/anime/zoro/name${$(e).find("h3.film-name").children("a").attr("href")}`
      }
      anime.synopsis[0].chronology.push(cronology);
    });
    return anime;
  } catch (error) {
    return error;
  }
}

/* AnimeInfo("tokyo-ghoul-790").then((f) => {
  console.log(f);
}); */

export default { AnimeInfo };
