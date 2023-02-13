import axios from "axios";
import * as ch from "cheerio";
import { Episode, EpisodeServer } from "../../../../utils/schemaProviders.js";
const url = "https://www2.animeflv.bz";

async function getEpisodeInfo(id) {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    const $ = ch.load(data);
    const title = $(".CapiTop").children("h1").text().trim();
    const getLinks = $(".CpCnA .anime_muti_link li");
    const number = id.match(/\d+/g);
    const getServers = new Episode();
    getServers.name = title;
    getServers.image = null;
    getServers.url = `/anime/flv/episode/${id}`;
    getServers.number = number[0]

    getLinks.each((i, e) => {
      const serversName = new EpisodeServer();
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
