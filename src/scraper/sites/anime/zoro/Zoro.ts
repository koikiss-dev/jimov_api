import axios from "axios";
import { load } from "cheerio";
import { Anime, Chronology } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import { AnimeSearch, ResultSearch, IAnimeSearch } from "../../../../types/search";

export class Zoro {
  readonly url = "https://aniwatch.to";

  async GetAnimeInfo(animeName: string): Promise<Anime> {
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
      anime.alt_name = [additionalInfo[0]];
      anime.url = `/anime/zoro/name/${animeName.replace("/", "")}`;
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
          .attr("href")
          .replace("/", "")}`;
        anime.chronology.push(chronology);
      });

      return anime;
    } catch (error) {
      console.log("An error occurred while getting the anime info", error);
      throw new Error("An error occurred while getting the anime info");
    }
  }
  //filter
  async Filter(
    type?: string,
    rated?: string,
    score?: string,
    season?: string,
    language?: string,
    sort?: string,
    genres?: string,
    page_anime?: string,
  ) {
    try {
      
      const { data } = await axios.get(`${this.url}/filter`, {
        params: {
          type: type,
          rated: rated,
          score: score,
          season: season,
          language: language,
          sort: sort || "default",
          genres: genres,
          page: page_anime || 1,
        },
      });
      
      const $ = load(data);
      const most_cards = $("div.film_list div.film_list-wrap div.flw-item");
      //const page_index = $("div.pre-pagination nav ul li.active");
      const filter_return = new ResultSearch<IAnimeSearch>();
      filter_return.results = [];
      most_cards.each((_i, e) => {
        const anime = new AnimeSearch();
        anime.name = $(e).find("a.dynamic-name").text().trim();
        anime.image = $(e)
          .find("div.film-poster")
          .find("img.film-poster-img")
          .attr("data-src");
        anime.url = `/anime/zoro/name/${$(e)
          .find("a.dynamic-name")
          .attr("href")
          .replace("/", "")}`;
        anime.type = $(e).find("div.fd-infor").children().first().text().trim();
        filter_return.results.push(anime);
      });
      return filter_return;
    } catch (error) {
      console.log("An error occurred while getting the episode servers", error);
      throw new Error("An error occurred while getting the episode servers");
    }
  }

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
      epi.name = animename;
      epi.url = `/anime/zoro/episode/${animename}/${ep}`;
      epi.servers = [];

      const promises = $("div.ps__-list div.item")
        .map((_i, e) => {
          const servers = new EpisodeServer();
          const serverId = $(e).attr("data-id").trim();
          return this.getServers(serverId)
            .then((response) => {
              const title = $(e).find("a").text().trim();
              const videoData = response.link;
              servers.name = title;
              servers.url = videoData;
              switch (title) {
                case "Streamtape":
                  servers.file_url = videoData.replace("/e/", "/v/");
                  break;
                case "StreamSB":
                  servers.file_url = videoData.replace("/e/", "/d/");
                  break;
                default:
                  break;
              }
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
