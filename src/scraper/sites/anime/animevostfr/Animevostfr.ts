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

/** List of Domains
 *
 * https://animevostfr.tv
 *
 */

export class Animevostfr extends AnimeProviderModel {
  readonly url = "https://animevostfr.tv";

  async GetAnimeInfo(anime: string): Promise<Anime> {
    try {
      const { data } = await axios.get(`${this.url}/${anime}`);
      const $ = cheerio.load(data);

      const AnimeTypes = $(
        ".mvic-info .mvici-right p strong:contains(' Type:')"
      )
        .nextAll()
        .text();
      const AnimeStatus = $(".mvic-info .mvici-right p a[rel='tag']")
        .first()
        .text();
      const AnimeDate = $(".mvic-info .mvici-right p strong:contains(' An:')")
        .nextAll()
        .text();
      const AnimeDescription = $(".mvi-content .mvic-desc .desc p").html();

      const AnimeInfo: Anime = {
        name: $(".mvi-content .mvic-desc h1").text(),
        url: `/anime/animevostfr/name/${anime}`,
        synopsis: AnimeDescription.slice(
          AnimeDescription.indexOf("Synopsis:") + "Synopsis:".length,
          -1
        ).trim(),
        alt_name: [
          ...AnimeDescription.slice(
            AnimeDescription.indexOf("Titre alternatif:") +
            "Titre alternatif:".length,
            AnimeDescription.indexOf("Synopsis:")
          )
            .replace("<br>\n", "")
            .split("/")
            .map((n) => n.replace(/^\s+|\s+$|\s+(?=\s)/g, "")),
        ],
        image: {
          url: $(".mvi-content .mvic-thumb img").attr("data-lazy-src"),
        },
        genres: [
          ...$(".mvic-info .mvici-left p")
            .first()
            .text()
            .replace("\n Genres:\n ", "")
            .split(",")
            .map((n) => n.replace(/^\s+|\s+$|\s+(?=\s)/g, "")),
        ],
        type:
          AnimeTypes == "Anime"
            ? "Anime"
            : AnimeTypes == "MOVIE"
              ? "Movie"
              : "Null", //tv,pelicula,especial,ova
        status: AnimeStatus == "En cours" ? true : false,
        date: AnimeDate ? { year: AnimeDate } : null,
        episodes: [],
      };

      $("#seasonss .les-title").each((_i, e) => {
        const number = $(e)
          .find("a")
          .attr("href")
          .substring($(e).find("a").attr("href").lastIndexOf("-") + 1)
          .replace("/", "");
        const AnimeEpisode: Episode = {
          name: "Episode " + number,
          number: number,
          image: "",
          url: `/anime/animevostfr/episode/${anime + "-" + number}`,
        };

        AnimeInfo.episodes.push(AnimeEpisode);
      });

      return AnimeInfo;
    } catch (error) {
      console.log(error);
    }
  }
  async GetEpisodeServers(episode: string): Promise<Episode> {
    try {
      const number = episode.substring(episode.lastIndexOf("-") + 1);
      const anime = episode.substring(0, episode.lastIndexOf("-"));

      const { data } = await axios.get(
        `${this.url}/episode/${anime}-episode-${number}`
      );
      const $ = cheerio.load(data);
      const s = $(".form-group.list-server select option");
      const e = $(`.list-episodes select option[value='${number}']`);
      const ListFilmId = $(e).attr("episodeid");
      const ListServer = [];
      s.map((_i, e) => ListServer.push($(e).val()));
      /*
                "SERVER_VIP"
                "SERVER_HYDRAX"
                "SERVER_PHOTOSS"
                "SERVER_DOWNLOAD"							
                "SERVER_PHOTOS"			
                "SERVER_OPEN_LOAD"
                "SERVER_OPEN_LOADS"				
                "SERVER_OPEN_CDN"
                "SERVER_OPEN_CDNO"						
                "SERVER_PHOTO"
                "SERVER_STREAM_MANGO"
                "SERVER_RAPID_VIDEO"
            */

      const AnimeEpisodeInfo: Episode = {
        name: "Episode " + number,
        url: `/anime/animevostfr/episode/${episode}`,
        number: number,
        image: "",
        servers: [],
      };
      await Promise.all(
        ListServer.map(async (n: string) => {
          if (n == "opencdn" || n == "photo" || n == "vip") {
            const sservers = await axios.get(
              `${this.url}/ajax-get-link-stream/?server=${n}&filmId=${ListFilmId}`
            );
            let currentData = sservers.data;
            currentData = currentData
              .replace(`?logo=${this.url}/1234.png`, "")
              .replace("hydrax.net/watch", "abysscdn.com/")
              .replace("short.ink/", "abysscdn.com/?v=");
            let Servers: EpisodeServer = {
              name: n,
              url: currentData,
            };
            AnimeEpisodeInfo.servers.push(Servers);
          }
          return AnimeEpisodeInfo
        })
      )
      return AnimeEpisodeInfo;
    } catch (error) {
    }
  }

  async GetAnimeByFilter(
    search?: string,
    page?: number
  ): Promise<IResultSearch<IAnimeSearch>> {
    try {
      const { data } = await axios.get(`${this.url}/page/${page ? page : 1}`, {
        params: {
          s: search
        },
      });

      const $ = cheerio.load(data);

      const animeSearch: ResultSearch<IAnimeSearch> = {
        nav: {
          count: $(".movies-list .ml-item").length,
          current: page ? Number(page) : 1,
          next:
            $(".movies-list .ml-item").length < 32
              ? 0
              : Number(page) + 1,
          hasNext: $(".movies-list .ml-item").length < 32 ? false : true,
        },
        results: [],
      };

      $(".movies-list .ml-item").each((_i, e) => {
        const animeSearchData: AnimeSearch = {
          name: $(e).find(".mli-info").text(),
          image: $(e).find(".mli-thumb").attr("data-original"),
          url: `/anime/animevostfr/name/${$(e).find(".ml-mask").attr("href").replace(this.url, "").replace("/", "").replace("/", "")}`,
          type: $(e).find(".mli-quality").text().includes("Movie") ? "movie" : "anime",
        };
        animeSearch.results.push(animeSearchData);
      });
      return animeSearch;
    } catch (error) {
      console.log(error);
    }
  }
}
