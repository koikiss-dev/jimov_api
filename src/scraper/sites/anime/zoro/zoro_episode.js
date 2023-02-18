import axios from "axios";
import {load} from "cheerio";
import { EpisodeServer } from "../../../../utils/schemaProviders.js";

const url_zoro = "https://zoro.to";

/**
 * 
 * @param {*} anime 
 * @param {*} ep 
 * @returns servver id
 */
async function getServersId(anime, ep) {
  const animename = anime.toLowerCase().replace(/\s/g, "-");
  const error_page = [
    {
      error: "Invalid or incompleted param",
      valids_params: "anime name and episode id",
      code: 404,
      value: false,
    },
  ];
  try {
    const { data } = await axios.get(`${url_zoro}/ajax/v2/episode/servers?episodeId=${ep}`, {
      headers: {
        "Accept-Encoding": "*r",
        Referer: `https://zoro.to/watch/${animename}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });

    const servers = new EpisodeServer();
    const $ = load(data.html);
    $("body > div.ps_-block.ps_-block-sub.servers-sub > div.ps__-list > div.item").each((i, el) => {
      const type = el.attribs["data-type"];
      const name = $(el).text().trim();
      const serverId = el.attribs["data-id"];
      const serverId2 = el.attribs["data-server-id"];
      const url = `/anime/zoro/iframe/${serverId}`;
      const devNote = name === "StreamSB"
        ? "Reccomended Server"
        : "Might not work, rapid-cloud requries to have host as zoro.to";

      servers.name = name;
      servers.url = url;
    });

    return servers;
  } catch (error) {
    return error_page;
  }
}

/**
 * 
 * @param {*} id 
 * @returns source
 */
async function getServers(id) {
  const { data } = await axios.get(`${url_zoro}/ajax/v2/episode/sources?id=${id}`);
  return data;
}
/* getServersId("hunter-x-hunter-2", 65).then((f) => {
  console.log(f);
});

getServers(734385).then(f =>{
  console.log(f)
}) */
export default { getServersId, getServers };
