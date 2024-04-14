import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import {
  AnimeSearch,
  ResultSearch,
  type IResultSearch,
  type IAnimeSearch,
} from "../../../../types/search";
import { AnimeProviderModel } from "../../../ScraperAnimeModel";

export class AnimeLatinoHD extends AnimeProviderModel {
  readonly url = "https://www.animelatinohd.com";
  readonly api = "https://api.animelatinohd.com";

  async GetAnimeInfo(anime: string): Promise<Anime> {
    try {
      const { data } = await axios.get(`${this.url}/anime/${anime}`);
      const $ = cheerio.load(data);

      const animeInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props
        .pageProps.data;

      const AnimeInfo: Anime = {
        name: animeInfoParseObj.name,
        url: `/anime/animelatinohd/name/${anime}`,
        synopsis: animeInfoParseObj.overview,
        alt_name: [...animeInfoParseObj.name_alternative.split(",")],
        image: {
          url:
            "https://www.themoviedb.org/t/p/original" +
            animeInfoParseObj.poster +
            "?&w=53&q=95",
        },
        genres: [...animeInfoParseObj.genres.split(",")],
        type: animeInfoParseObj.type,
        status: animeInfoParseObj.status == 1 ? "En emisión" : "Finalizado",
        date: animeInfoParseObj.aired,
        episodes: [],
      };

      animeInfoParseObj.episodes.map((e) => {
        const AnimeEpisode: Episode = {
          name: animeInfoParseObj.name,
          number: e.number + "",
          image:
            "https://www.themoviedb.org/t/p/original" +
            animeInfoParseObj.banner +
            "?&w=280&q=95",
          url: `/anime/animelatinohd/episode/${
            animeInfoParseObj.slug + "-" + e.number
          }`,
        };

        AnimeInfo.episodes.push(AnimeEpisode);
      });

      return AnimeInfo;
    } catch (error) {
      console.log(error);
    }
  }
  async GetEpisodeServers(episode: string, lang: string): Promise<Episode> {
    try {
      const number = episode.substring(episode.lastIndexOf("-") + 1);
      const anime = episode.substring(0, episode.lastIndexOf("-"));
      const langType = [
        { lang: "es", type: "Latino" },
        { lang: "jp", type: "Subtitulado" },
      ];

      const { data } = await axios.get(`${this.url}/ver/${anime}/${number}`);
      const $ = cheerio.load(data);

      const animeEpisodeParseObj = JSON.parse($("#__NEXT_DATA__").html()).props
        .pageProps.data;

      const AnimeEpisodeInfo: Episode = {
        name: animeEpisodeParseObj.anime.name,
        url: `/anime/animelatinohd/episode/${episode}`,
        number: number,
        image: "",
        servers: [],
      };

      const sel_lang = langType.filter((e) => e.lang == lang);
      let f_index = 0;

      if (sel_lang.length) {
        $("#languaje option").each((_i, e) => {
          if ($(e).text() == sel_lang[0].type) {
            f_index = Number($(e).val());
          }
        });
      } else {
        $("#languaje option").each((_i, e) => {
          f_index = Number($(e).val());
        });
      }

      await Promise.all(
        animeEpisodeParseObj.players[f_index].map(
          async (e: { server: { title: string }; id: string }) => {

            const Server: EpisodeServer = {
              name: e.server.title,
              url: "",
            };
            Server.url = "https://api.animelatinohd.com/stream/" + e.id;
            Server.name = e.server.title;

            AnimeEpisodeInfo.servers.push(Server);
          }
        )
      );

      return AnimeEpisodeInfo;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAnimeByFilter(
    search?: string,
    type?: number,
    page?: number,
    year?: string,
    genre?: string
  ): Promise<IResultSearch<IAnimeSearch>> {
    try {
      const { data } = await axios.get(`${this.api}/api/anime/list`, {
        params: {
          search: search,
          type: type,
          year: year,
          genre: genre,
          page: page,
        },
      });

      const animeSearchParseObj = data;

      const animeSearch: ResultSearch<IAnimeSearch> = {
        nav: {
          count: animeSearchParseObj.data.length,
          current: animeSearchParseObj.current_page,
          next:
            animeSearchParseObj.data.length < 28
              ? 0
              : animeSearchParseObj.current_page + 1,
          hasNext: animeSearchParseObj.data.length < 28 ? false : true,
        },
        results: [],
      };
      animeSearchParseObj.data.map((e) => {
        const animeSearchData: AnimeSearch = {
          name: e.name,
          image:
            "https://www.themoviedb.org/t/p/original" +
            e.poster +
            "?&w=53&q=95",
          url: `/anime/animelatinohd/name/${e.slug}`,
          type: "",
        };
        animeSearch.results.push(animeSearchData);
      });
      return animeSearch;
    } catch (error) {
      console.log(error);
    }
  }
}
