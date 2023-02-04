import axios from "axios";
import * as ch from "cheerio";

async function getAnimeRanking() {
  try {
    const { data } = await axios.get("https://www1.otakustv.com");
    const $ = ch.load(data);

    const animeRanking = [];

    const title = $(
      "div.ranking div.base-carusel div.carusel_ranking div.item "
    ).each((i, j) => {
      animeRanking.push({
        title: $(j).find("a").find("h2").text(),
        coverImg: $(j).find("a").find("img").attr("src"),
        linkTo: $(j).find("a").attr("href").replace("https://www1.otakustv.com/anime/", "/anime/otakuTV/"),
      });
    });

    return animeRanking;
  } catch (error) {
    return error;
  }
}

export default { getAnimeRanking };
