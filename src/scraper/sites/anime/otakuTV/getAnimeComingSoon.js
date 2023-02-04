import axios from "axios";
import * as ch from "cheerio";

export async function getComingSoon() {
  try {
    const { data } = await axios.get("https://www1.otakustv.com/");
    const $ = ch.load(data);

    const animes = [];

    const getAnimes = $(
      "div.pronto div.base-carusel div.carusel_pronto div.item "
    ).each((i, element) => {
      animes.push({
        name: $(element).find("h2").text().trim(),
        dateRelease: $(element).find("p").text().replace("Estreno: ", ""),
        link: $(element)
          .find("a")
          .attr("href")
          .replace("https://www1.otakustv.com/anime/", "/anime/otakuTV/"),
        coverImg: $(element).find("img").attr("data-src"),
      });
    });
    return animes;
  } catch (error) {
    return error;
  }
}

export default { getComingSoon };
