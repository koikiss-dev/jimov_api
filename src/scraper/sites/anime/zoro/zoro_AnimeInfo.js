import * as dotenv from "dotenv";
import axios from "axios";
import * as ch from "cheerio";
import _ from "underscore";
dotenv.config();

const url_zoro = "https://zoro.to";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = {
  "User-Agent": USER_AGENT,
  "X-Requested-With": "XMLHttpRequest",
};

async function searchZoro(key, page = 1) {
  const error_page = [
    {
      error: true,
      error_message: "No keyword provided",
      code: 404,
    },
  ];
  try {
    /* if (!key)
      return {
        error: true,
        error_message: "No keyword provided",
      }; */

    const { data } = await axios.get(
      `${url_zoro}/search?keyword=${key}&page=${page}`
    );
    const $ = ch.load(data);
    const list = [];

    $("div.film_list-wrap > div.flw-item").each((i, e) => {
      list.push({
        animeTitle: $(e).find("div.film-detail > .film-name > a").text(),
        animeId: $(e)
          .find("div.film-detail > .film-name > a")
          .attr("href")
          .split("/")[1]
          .split("?")[0],
        animeImg: $(e).find("div.film-poster > img").attr("data-src"),
      });
    });

    return list;
  } catch (error) {
    if(!key){
      return error_page
    }
  }
}

async function AnimeInfo(id) {
  const error_page = [
    {
      error: "Invalid or incompleted name",
      code: 404,
      value: false,
    },
  ];
  const animename = id.toLowerCase().replace(/\s/g, "-");
  try {
    const { data } = await axios.get(`${url_zoro}/${animename}`);

    const $ = ch.load(data);
    const anisc_info = []; //datos que tienen la misma clase por lo tanto es confuzo acceder sin hacer tanto desorden
    /*titulo y descripcion */
    const title = $("h2.film-name").text().trim();
    const description = $("div.film-description div.text").text().trim();
    const image = $("img.film-poster-img").attr("src");
    const play = $("div.film-buttons").find("a.btn-play").attr("href");
    /*titulo y descripcion */

    const items_title = $("div.anisc-info div.item-title").each((i, e) => {
      const data_span = $(e).children("span.name").text().trim();
      const data_a = $(e).children("a.name").text().trim();
      anisc_info.push(data_span, data_a);
    });

    const with_out_spaces = anisc_info.filter((el) => el != ""); //eliminar espacios innecesarios del array anisc_info

    const information = [
      {
        title: title,
        img: image,
        watch: play,
        alt_title: with_out_spaces[0],
        /* Synonyms: with_out_spaces[1], */
        /*  aired: with_out_spaces[2],
        duration: with_out_spaces[4], */
        /* status: with_out_spaces[5],
        mal_score: with_out_spaces[6], */
        studios: with_out_spaces[7],
        recommendations: [],
        related_anime: [],
        characters: [],
        total_episodes: "",
        synopsis: [
          {
            tags: [],
            link_tags: [],
            description: description,
            episodes: [],
          },
        ],
      },
    ];
    const genres = $("div.anisc-info div.item-list a").each((i, e) => {
      const gen = $(e).text().trim();
      const link = $(e).attr("href");
      information[0].synopsis[0].tags.push(gen);
      information[0].synopsis[0].link_tags.push(link);
    });

    const actors_anime = $(
      "div.block-actors-content div.bac-list-wrap div.bac-item"
    ).each((i, e) => {
      const name = $(e).find("h4.pi-name").children("a").text().trim();
      information[0].characters.push(name);
    });
    const recommendatio = $(
      "div.film_list-wfeature div.film_list-wrap div.flw-item"
    ).each((i, e) => {
      const data_recommendation = {
        title: "",
        poster: "",
        type: "",
        episode: "",
        link: "",
      };
      data_recommendation.title = $(e)
        .find("h3.film-name")
        .children("a")
        .text()
        .trim();
      data_recommendation.poster = $(e)
        .find("img.film-poster-img")
        .attr("data-src");
      data_recommendation.type = $(e)
        .find("span.fdi-item")
        .first()
        .text()
        .trim();
      data_recommendation.episode = $(e).find("div.tick-eps").text().trim();
      data_recommendation.link = $(e)
        .find("h3.film-name")
        .children("a")
        .attr("href");
      information[0].recommendations.push(data_recommendation);
    });
    const related = $("div.anif-block-ul ul li").each((i, e) => {
      const related_anime = {
        title: "",
        poster: "",
        type: "",
        eps: "",
        link: "",
      };
      related_anime.title = $(e).find("h3.film-name").text().trim();
      related_anime.link = $(e).find("h3.film-name").children("a").attr("href");
      related_anime.poster = $(e).find("img.film-poster-img").attr("data-src");
      related_anime.type = $(e)
        .find("div.fd-infor")
        .find("span.fdi-item")
        .first()
        .text()
        .trim();
      related_anime.eps = $(e)
        .find("div.fd-infor")
        .find("span.fdi-item")
        .first()
        .next()
        .next()
        .text()
        .trim();
      information[0].related_anime.push(related_anime);
    });
    const newArr = animename.split("-").pop();
    const deletea = _.initial(newArr).join("-");
    const episodeRes = await axios.get(
      `${url_zoro}/ajax/v2/episode/list/${newArr}`,
      {
        headers: {
          ...headerOption,
          Referer: `${url_zoro}/watch/${animename}`,
        },
      }
    );
    const $$ = ch.load(episodeRes.data.html);
    const totalEpisodes = $$(
      "div.detail-infor-content > div.ss-list > a"
    ).length;
    information[0].total_episodes = totalEpisodes;
    $$("div.detail-infor-content > div.ss-list > a").each((i, el) => {
      information[0].synopsis[0].episodes.push({
        epNum: $(el).attr("data-number"),
        episodeName: $(el).attr("title"),
        episodeId: $(el)
          .attr("href")
          .split("/")
          .pop()
          .replace("?ep=", "-episode-"),
      });
    });
    return information;
  } catch (error) {
    return error_page;
  }
}

/* AnimeInfo("hunter x hunter 2").then((f) => {
  console.log(f);
}); */

export default { AnimeInfo, searchZoro };
