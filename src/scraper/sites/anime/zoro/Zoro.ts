import axios from "axios";
import { load } from "cheerio";
import { Anime, Chronology } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";

export class Zoro {
  readonly url = "https://zoro.to";

  async getAnimeInfo(animeName: string): Promise<Anime> {
    try {
      const response = await axios.get(`${this.url}/${animeName}`);
      const $ = load(response.data);
      const anime = new Anime();
      const aniscInfo = [];

      // get additional anime info
      $("div.anisc-info div.item-title").each((_i, e) => {
        const dataSpan = $(e).children("span.name").text().trim();
        const dataA = $(e).children("a.name").text().trim();
        aniscInfo.push(dataSpan, dataA);
      });

      // remove empty items from the array
      const additionalInfo = aniscInfo.filter((el) => el !== "");

      // set anime properties
      anime.name = $("h2.film-name").text().trim();
      anime.alt_name = [...additionalInfo[0]];
      anime.url = `/anime/zoro/name/${animeName}`;
      anime.synopsis = $("div.film-description div.text").text().trim();
      anime.image = { url: $("img.film-poster-img").attr("src") };
      anime.genres = [];
      anime.chronology = [];

      // get anime genres
      $("div.anisc-info div.item-list a").each((_i, e) => {
        const genre = $(e).text().trim();
        anime.genres.push(genre);
      });

      // get anime chronology
      $("div.anif-block-ul ul li").each((_i, e) => {
        const chronology = new Chronology();
        chronology.name = $(e).find("h3.film-name").children("a").text().trim();
        chronology.url = `/anime/zoro/name/${$(e)
          .find("h3.film-name")
          .children("a")
          .attr("href")}`;
        anime.chronology.push(chronology);
      });

      return anime;
    } catch (error) {
      console.log("An error occurred while getting the anime info", error);
      throw new Error("An error occurred while getting the anime info");
    }
  }
  //filter

  //episode server
  async GetEpisodeServer(episode: string, ep: string) {
    try {
      const animename = episode.toLowerCase().replace(/\s/g, "-");
      const { data } = await axios.get(
        `${this.url}/ajax/v2/episode/servers?episodeId=${ep}`,
        {
          headers: {
            "Accept-Encoding": "*r",
            Referer: `https://zoro.to/watch/${animename + "-" + ep}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
      const $ = load(data.html);
      const epi = new Episode();
      epi.name = animename
      epi.url = `/anime/zoro/episode/${animename}/${ep}`
      epi.servers = [];

      const promises = $("div.ps__-list div.item")
        .map((_i, e) => {
          const servers = new EpisodeServer();
          const serverId = $(e).attr("data-id").trim();
          return this.getServers(serverId)
            .then((response) => {
              servers.name = $(e).find('a').text().trim();
              servers.url = response.link;
              epi.servers.push(servers);
            })
            .catch((error) => {
              console.log("Error getting servers for episode", error);
              throw new Error("Error getting servers for episode");
            });
        })
        .get();

      await Promise.all(promises);
      return epi;
    } catch (error) {
      console.log("An error occurred while getting the episode servers", error);
      throw new Error("An error occurred while getting the episode servers");
    }
  }

  private async getServers(id): Promise<any> {
    const { data } = await axios.get(
      `${this.url}/ajax/v2/episode/sources?id=${id}`
    );
    return data;
  }
}
/* 
const g = new Zoro();

g.GetEpisodeServer("hunter-x-hunter-2", "65").then((f) => {
  console.log(f);
}); */