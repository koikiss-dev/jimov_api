import axios from "axios";
import * as ch from "cheerio";
import {
  GetAnimeEpisode,
  GetAnimeServers,
} from "../../../../utils/shemaProvidersExperimental.js";

const url = "https://www2.animeflv.bz";

async function getEpisodeInfo(id) {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    const $ = ch.load(data);
    //const title = $(".CapiTop").children("h1").text().trim();
    const getLinks = $(".CpCnA .anime_muti_link li");
    //const next = $(".CapNvNx").attr("href");
    //const prev = $(".CapNvPv").attr("href");
    const getServers = new GetAnimeEpisode();
    /*  const links_episodes = [
      {
        title_episode: title,
        next_episode: next === undefined ? false : `/anime/flv/episode${next}`,
        prev_episode: prev === undefined ? false : `/anime/flv/episode${prev}`,
        cap_list_link: $(".CapNvLs").attr("href").replace('/anime', '/anime/flv'),
        servers: []
      },
    ]; */

    getLinks.each((i, e) => {
      const serversName = new GetAnimeServers();
      serversName.name =  $(e).attr("title");
      serversName.url = $(e).attr("data-video");
   
      getServers.servers.push(serversName);
    });
    return getServers;
  } catch (error) {
    return false;
  }
}


export default { getEpisodeInfo };
