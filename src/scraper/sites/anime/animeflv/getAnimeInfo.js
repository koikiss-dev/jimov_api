
import axios from "axios";
import * as ch from "cheerio";


const url = 'https://www2.animeflv.bz';

async function animeInfo(anime) {
  try {
    const { data } = await axios.get(`${url}/anime/${anime}`);
    const $ = ch.load(data);
    const title = $("h2.Title").text().trim();
    const title_alt = $("span.TxtAlt").text().trim();
    const type = $("span.Type").text().trim();
    const img = $("div.AnimeCover .Image figure img").attr("src");
    const status = $("p.AnmStts span").text().trim();
    const sinopsis = $("div.Description").text().trim();
    const episodes = $(".ListCaps li a");
    const anime_info = [
      {
        title: title,
        title_alt: title_alt,
        type: type,
        img: img,
        status: status,
        synopsis:[{
          tags:[],
          description: sinopsis,
        }],
        similar_anime: [],
        episodes: [],
      },
    ];

    //get genres
    const genres = $("nav.Nvgnrs a").each((i, e) => {
      const gen = $(e).text().trim();
      anime_info[0].synopsis[0].tags.push(gen);
    });
    //getRelated
    const similar_anime = $("ul.ListAnmRel li a").each((i, e) => {
      const data = { similar: "", link: "" };
      data.similar = $(e).text().trim();
      data.link = $(e).attr("href").replace('/anime', '/anime/flv');
      anime_info[0].similar_anime.push(data);
    });
    //get episodes
    episodes.each((i, e) => {
      const l = $(e).attr("href");
      const data = {
        title_episode: "",
        episode_number: "",
        link_episode: "",
        img_episode: "",
      };
      data.title_episode = $(e).children(".Title").text().trim();
      data.episode_number = $(e).children("p").last().text().trim();
      data.link_episode = `/anime/episode${l}`.replace('/anime', '/anime/flv');
      data.img_episode = $(e).children("figure").find(".lazy").attr("src");

      anime_info[0].episodes.push(data);
    });
    return anime_info;
  } catch (error) {
    return false;
  }
}

export default { animeInfo };
