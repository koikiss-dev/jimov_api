import { type IAnimeMedia } from "@animetypes/anime";
import { getHTML } from "./getHTML";

export async function getAllAnimes(url: string, numPage: number) {
  try {
    const animes: IAnimeMedia[] = [];

    const $ = await getHTML(`${url}?page=${numPage}`);

    const pageState = $(".anime_name h2")
      .text()
      .replace("ADVERTISEMENTSRECENT RELEASESeason", "")
      .trim();

    if (pageState != "404 Not found") {
      $(".last_episodes ul li").each((_, element) => {
        const animeName = $(element).find("p.name").find("a").text().trim();

        const animeImage = $(element)
          .find(".img")
          .find("a")
          .find("img")
          .attr("src");

        const animeNameUrl = $(element)
          .find(".img")
          .find("a")
          .attr("href")
          .replace("/category/", "");

        let year: string | number = $(element)
          .find("p.released")
          .text()
          .replace("Released: ", "");

        year = parseInt(year);

        animes.push({
          name: animeName,
          image: {
            url: animeImage,
          },
          url: `/anime/gogoanime/name/${animeNameUrl}`,
          date: {
            begin: {
              year: year,
            },
          },
        });
      });
    }

    return animes;
  } catch (error) {
    return error;
  }
}
