import * as dotenv from "dotenv";
import axios from "axios";
import * as ch from "cheerio";
import _ from "underscore";
import { scrapeSource } from "../../../helper/rapid-cloud.js";
dotenv.config();

const url_zoro = process.env.ZORO;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = {
  "User-Agent": USER_AGENT,
  "X-Requested-With": "XMLHttpRequest",
};

async function getEpisodeInfo(anime, ep) {
  const animename = anime.toLowerCase().replace(/\s/g, "-");
  try {
    /* const { data } = await axios.get(`${url_zoro}/watch/${anime}`, {
      params: {
        ep: ep,
      },
    });
    if (!anime) return {
      error: true,
      error_message: "Episode ID not provided"
  }; */

    const episodeId = animename.split("-").pop();
    const res = await axios.get(
      `${url_zoro}/ajax/v2/episode/servers?episodeId=${episodeId}`,
      {
        headers: headerOption,
      }
    );
    const $ = ch.load(res.data.html);

    // console.log(res.data.html)

    let dataId;
    let subOrDub = "sub";

    $(`div.servers-${subOrDub} > div.ps__-list > div.server-item`).each(
      (i, el) => {
        if ($(el).attr("data-server-id") === 1) {
          dataId += $(el).attr("data-id");
        }
      }
    );
    // console.log(subOrDub)

    if (subOrDub === "dub" && $("div.servers-dub").length <= 0) {
      return {
        noDubs: true,
        error_message: "No dubs available for this episode",
      };
    }

    const sources = await scrapeSource(dataId);

    return sources;
    /* let list = {};
    let episodes = [];
    const $ = ch.load(data);
    const animeTitle = $("div.anisc-detail > h2.film-name > a").text();
    const animeImg = $("div.anisc-poster > div.film-poster > img").attr("src");
    const synopsis = $("div.film-description > div.text").text().trim();
    const type = $("div.film-stats > span.item").last().prev().prev().text();
    let dubbed = false;

    Array.from($("div.film-stats span.item div.tick-dub")).map((el) => {
      if ($(el).text().toLowerCase().includes("dub")) dubbed = true;
    });
    const idNum = anime.split("-")
    const idNumComp = _.initial(idNum).join("-");

    const episodeRes = await axios.get(
      `${url_zoro}/ajax/v2/episode/list/${ep}`,
      {
        headers: {
          ...headerOption,
          Referer: `${url_zoro}/watch/${anime}`,
        },
      }
    );
    const $$ = ch.load(episodeRes.data.html);
    const totalEpisodes = $$(
      "div.detail-infor-content > div.ss-list > a"
    ).length;

    $$("div.detail-infor-content > div.ss-list > a").each((i, el) => {
      episodes.push({
        epNum: $(el).attr("data-number"),
        episodeName: $(el).attr("title"),
        episodeId: $(el)
          .attr("href")
          .split("/")
          .pop()
          .replace("?ep=", "-episode-"),
      });
    });
    list = {
      animeTitle,
      animeImg,
      synopsis,
      type,
      isDubbed: dubbed,
      totalEpisodes,
      episodes,
    };

    return list; */
  } catch (error) {
    console.log(error);
    /* return {
      error: true,
      error_message: err,
    }; */
  }
}

getEpisodeInfo("hunter x hunter 2", 2).then((f) => {
  console.log(f);
});

export default { getEpisodeInfo };

/* const {data} = await axios.get('https://enime.moe/')
  const $ = ch.load(data)
  const newArr = anime.split('-')
  const deletea = _.initial(newArr).join('-')
  return deletea */
