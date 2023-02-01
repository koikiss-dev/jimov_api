//obtiene el id de cada servidor en el episodio y posteriormente en otra funcion regresa los embeds de dicho anime
/*
*@params [anime, ep] -> anime name and episode id
*@return server id
*/


import axios from "axios";
import * as ch from "cheerio";
import _ from "underscore";


const url_zoro = 'https://zoro.to';

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
    const { data } = await axios.get(
      `${url_zoro}/ajax/v2/episode/servers?episodeId=${ep}`,
      {
        headers: {
          "Accept-Encoding": "*r",
          Referer: `https://zoro.to/watch/${animename}`,//referencia de pagina para obtener el id
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    );
    const $ = ch.load(data.html);
    const serversData = [
      {
        serverSub: [],
        serverDub: [],
      },
    ];

    $(
      "body > div.ps_-block.ps_-block-sub.servers-sub > div.ps__-list > div.item "
    ).each((i, el) => {
      let type = el.attribs["data-type"];
      let server = $(el).text().trim();
      let serverId = el.attribs["data-id"];
      let serverId2 = el.attribs["data-server-id"];
      let devNote =
        server === "StreamSB"
          ? "Reccomended Server"
          : "Might not work, rapid-cloud requries to have host as zoro.to";
      serversData[0].serverSub.push({
        type,
        server,
        serverId,
        serverId2,
        devNote,
      });
    });

    $(
      "body > div.ps_-block.ps_-block-sub.servers-dub > div.ps__-list > div.item "
    ).each((i, el) => {
      let type = el.attribs["data-type"];
      let server = $(el).text().trim();
      let serverId = el.attribs["data-id"];
      let serverId2 = el.attribs["data-server-id"];
      let devNote =
        server === "StreamSB"
          ? "Reccomended Server"
          : "Might not work, might require to have host and referer as zoro.to";
      serversData[0].serverDub.push({
        type,
        server,
        serverId,
        serverId2,
        devNote,
      });
    });

    return serversData
  } catch (error) {
    return error_page;
  }
}
//get servers embed
/*
*@params [id] -> id server
*@return anime fembed
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

