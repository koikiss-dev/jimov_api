import axios from 'axios'
import { load } from "cheerio";
import { Anime, Chronology } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import {
  Genres,
  OrderAnimeflv,
  StatusAnimeflv,
  TypeAnimeflv,
} from "./animeflv_helper";
import { AnimeSearch, ResultSearch, IResultSearch, IAnimeSearch } from "../../../../types/search";

export class AnimeFlv {
  readonly url = "https://www2.animeflv.bz";

  async GetAnimeInfo(anime: string): Promise<Anime> {
    try {
      const { data } = await axios.get(`${this.url}/anime/${anime}`);
      const $ = load(data);
      const title = $("h2.Title").text().trim();
      const title_alt = $("span.TxtAlt").text().trim();
      const img = $("div.AnimeCover .Image figure img").attr("src");
      const status = $("p.AnmStts span").text().trim();
      const synopsis = $("div.Description").text().trim();
      const episodes = $(".ListCaps li a");
      const AnimeReturn = new Anime();
      AnimeReturn.name = title;
      AnimeReturn.alt_name = [...title_alt.split(",")];
      AnimeReturn.image = {
        url: img,
      };
      AnimeReturn.status = status;
      AnimeReturn.synopsis = synopsis;
      AnimeReturn.chronology = [];

      //getRelated
      $("ul.ListAnmRel li a").each((_i, e) => {
        const cro = new Chronology();
        cro.name = $(e).text().trim();
        cro.url = `/anime/flv/name/${$(e)
          .attr("href")
          .replace("/anime/", "")}`;
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
        const episode = new Episode();
        episode.name = $(e).children(".Title").text().trim();
        episode.url = `/anime/flv/episode/${`${l}`.replace(
          "/anime",
          "/anime/flv"
        )}`;
        episode.number = $(e).children("p").last().text().trim();
        episode.image = $(e).children("figure").find(".lazy").attr("src");
        AnimeReturn.episodes.push(episode);
      });
      return AnimeReturn;
    } catch (error) {
      console.log("An error occurred while getting the anime info: invalid name", error);
      throw new Error("An error occurred while getting the anime info: invalid name");
    }
  }

  async Filter(
    gen?: Genres | string,
    date?: string,
    type?: TypeAnimeflv,
    status?: StatusAnimeflv,
    ord?: OrderAnimeflv,
    page?: number
  ): Promise <IResultSearch<IAnimeSearch>> {
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
      const data_filter = new ResultSearch<IAnimeSearch>();
      data_filter.results = [];
      info.each((_i, e) => {
        const info = new AnimeSearch();
        info.name = $(e).find(".Title").last().text().trim();
        info.image = $("figure").children("img").attr("src");
        info.url = `/anime/flv/name/${$(e)
          .find("a")
          .attr("href")
          .replace("/anime/", "")}`;
        info.type = $(e).find("p").children("span.Type").text().trim();
        data_filter.results.push(info);
      });
      return data_filter;
    } catch (error) {
      console.log("An error occurred while getting the filter values", error);
      throw new Error("An error occurred while getting the filter values");
    }
  }

  async GetEpisodeServers(episode: string): Promise<Episode> {
    try {
      const { data } = await axios.get(`${this.url}/${episode}`);
      const $ = load(data);
      const title = $(".CapiTop").children("h1").text().trim();
      const getLinks = $(".CpCnA .anime_muti_link li");
      const numberEpisode = episode.match(/\d+/g);
      const episodeReturn = new Episode();
      episodeReturn.name = title;
      episodeReturn.url = `/anime/flv/episode/${episode}`;
      episodeReturn.number = numberEpisode as unknown as string;
      episodeReturn.servers = [];
      getLinks.each((_i, e) => {
        const servers = new EpisodeServer();
        servers.name = $(e).attr("title");
        servers.url = $(e).attr("data-video");
        episodeReturn.servers.push(servers);
      });
      return episodeReturn;
    } catch (error) {
      console.log("An error occurred while getting the episode servers", error);
      throw new Error("An error occurred while getting the episode servers");
    }
  }
}