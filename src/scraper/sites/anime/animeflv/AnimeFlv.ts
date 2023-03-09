import axios from "axios";
import { load } from "cheerio";
import {
  IEpisode,
  IEpisodeServer,
  IChronology,
  IAnime,
  Genres,
  StatusAnimeflv,
  OrderAnimeflv,
  TypeAnimeflv,
  IResultSearch,
  IAnimeSearch,
} from "../../../../types/schemaProviders";
/*
It is not finished yet but you can get an idea

Suggested structure for the providers, you must declare a class and inside write the necessary 
functions but the three that are required are: GetAnimeInfo that will return the information of 
the anime in general, EpisodeServers that will return the links and names of the servers 
where the episodes are and Filter that will return an array with the search results, please check 
the file shemaProviders.ts. Encapsulate everything in the same file with the name 
of the provider, e.g. Animeflv.ts.

Sincerely: yako :)
*/

class AnimeFlv {
  readonly url = "https://www2.animeflv.bz";

  async GetAnimeInfo(anime: string): Promise<IAnime> {
    try {
      const { data } = await axios.get(`${this.url}/anime/${anime}`);
      const $ = load(data);
      const title = $("h2.Title").text().trim();
      const title_alt = $("span.TxtAlt").text().trim();
      const img = $("div.AnimeCover .Image figure img").attr("src");
      const status = $("p.AnmStts span").text().trim();
      const synopsis = $("div.Description").text().trim();
      const episodes = $(".ListCaps li a");
      const AnimeReturn: IAnime = {
        name: title,
        alt_name: title_alt,
        image: {
          url: img,
        },
        status: status,
        synopsis: synopsis,
        chronology: [],
        url: `/anime/flv/name/${anime}`,
        genres: [],
        episodes: [],
      };

      //getRelated
      $("ul.ListAnmRel li a").each((_i, e) => {
        const cro: IChronology = {
          name: $(e).text().trim(),
          url: `/anime/flv/name/${$(e)
            .attr("href")
            .replace("/anime", "/anime/flv")}`,
        };
        AnimeReturn.chronology.push(cro);
      });
      //get genres
      $("nav.Nvgnrs a").each((_i, e) => {
        const gen = $(e).text().trim();
        AnimeReturn.genres.push(gen);
      });
      //get episodes
      episodes.each((_i_, e) => {
        const l = $(e).attr("href").replace("/", "");
        const episode: IEpisode = {
          name: $(e).children(".Title").text().trim(),
          url: `/anime/flv/episode/${`${l}`.replace("/anime", "/anime/flv")}`,
          number: $(e).children("p").last().text().trim(),
          image: $(e).children("figure").find(".lazy").attr("src"),
        };
        AnimeReturn.episodes.push(episode);
      });
      return AnimeReturn;
    } catch (error) {
      console.log("An error occurred while getting the anime info", error);
      throw new Error("An error occurred while getting the anime info");
    }
  }

  async Filter(
    gen?: Genres,
    date?: string,
    type?: TypeAnimeflv,
    status?: StatusAnimeflv,
    ord?: OrderAnimeflv,
    page?: number
  ): Promise<IResultSearch> {
    try {
      const { data } = await axios.get(`${this.url}/browse`, {
        params: {
          genres: gen || "all",
          year: date || "all",
          status: status || "all",
          Tipo: type || "all",
          order: ord || 1,
          page: page || 1,
        },
      });
      const $ = load(data);
      const info = $("ul.ListAnimes li article.Anime div.Description");
      const data_anime: IResultSearch = {
        nav: {
          current: page || 1,
        },
        results: [],
      };
      info.each((_i, e) => {
        const info: IAnimeSearch = {
          name: $(e).find(".Title").last().text().trim(),
          image: $("figure").children("img").attr("src"),
          url: `/anime/flv/name/${$(e)
            .find("a")
            .attr("href")
            .replace("/", "")}`,
          type: $(e).find("p").children("span.Type").text().trim(),
        };
        data_anime.results.push(info);
      });
      return data_anime;
    } catch (error) {
      console.log("An error occurred while getting the filter values", error);
      throw new Error("An error occurred while getting the filter values");
    }
  }
  async GetEpisodeServers(episode: string): Promise<IEpisode> {
    try {
      const { data } = await axios.get(`${this.url}/${episode}`);
      const $ = load(data);
      const title = $(".CapiTop").children("h1").text().trim();
      const getLinks = $(".CpCnA .anime_muti_link li");
      const numberEpisode = episode.match(/\d+/g);

      const episodeReturn: IEpisode = {
        name: title,
        url: `/anime/flv/episode/${episode}`,
        number: numberEpisode as unknown as string,
        servers: [],
      };
      getLinks.each((_i, e) => {
        const servers: IEpisodeServer = {
          name: $(e).attr("title"),
          url: $(e).attr("data-video"),
        };
        episodeReturn.servers.push(servers);
      });
      return episodeReturn;
    } catch (error) {
      console.log("An error occurred while getting the episode servers", error);
      throw new Error("An error occurred while getting the episode servers");
    }
  }
}
