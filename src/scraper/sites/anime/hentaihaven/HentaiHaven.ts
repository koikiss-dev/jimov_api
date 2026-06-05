import * as cheerio from "cheerio";
import axios from "axios";
import { AnimeMedia } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";

import { ResultSearch, AnimeResult } from "../../../../types/search";
import { AnimeScraperModel } from "../../../../models/AnimeScraperModel";

export class HentaiHaven extends AnimeScraperModel {
  readonly url = "https://hentaihaven.com";

  async GetItemInfo(anime: string): Promise<AnimeMedia> {
    try {
      const { data } = await axios.get(`${this.url}/video/${anime}`);
      const $ = cheerio.load(data);
      const genres = [];

      $(".single_data .list")
        .first()
        .find("a")
        .each((_i, e) => genres.push($(e).text()));

      const AnimeInfo: AnimeMedia = {
        name: $("h1.htitle").text().trim(),
        url: `/anime/hentaihaven/name/${anime}`,
        synopsis: $(".vraven_expand .vraven_text.single p")
          .last()
          .text()
          .replace(/\n/g, ""),
        alt_names: [
          ...$(".col-12.col-xl-9 h3.h4")
            .text()
            .split(",")
            .map((v) => v.trim()),
        ],
        image: {
          url: $(".hentai_cover .shadow img").attr("src"),
        },
        nsfw: true,
        genres: [...genres],
        episodes: [],
      };

      $(".hentai__episodes ul li").each((_i, e) => {
        const number = Number(
          $(e).find("a .chapter_info .title").text().replace("Episode ", "")
        );
        const AnimeEpisode: Episode = {
          name: $(e).find("a .chapter_info .title").text(),
          num: number,
          thumbnail: {
            url: $(e).find("a img").attr("src"),
          },
          url: `/anime/hentaihaven/episode/${anime}-${number}`,
        };

        AnimeInfo.episodes.push(AnimeEpisode);
      });

      return AnimeInfo;
    } catch (error) {
      console.error(error);
    }
  }
  async GetEpisodeServers(episode: string): Promise<Episode> {
    try {
      const number = episode.substring(episode.lastIndexOf("-") + 1);
      const anime = episode.substring(0, episode.lastIndexOf("-"));

      const { data } = await axios.get(
        `${this.url}/video/${anime}/episode-${number}`
      );
      const $ = cheerio.load(data);

      const AnimeEpisodeInfo: Episode = {
        name: $(".video_footer #chapter-heading").text(),
        url: `/anime/hentaihaven/episode/${episode}`,
        num: Number(number),
        servers: [],
      };

      const Server: EpisodeServer = {
        name: "Main Server",
        url: $(".player_logic_item iframe").attr("src"),
      };
      AnimeEpisodeInfo.servers.push(Server);

      return AnimeEpisodeInfo;
    } catch (error) {
      console.error(error);
    }
  }

  async GetItemByFilter(
    search?: string,
    page: number = 1
  ): Promise<ResultSearch<AnimeResult>> {
    try {
      const { data } = await axios.get(`${this.url}/page/${page}`, {
        params: {
          s: search,
        },
      });
      const $ = cheerio.load(data);
      const count = $(".row_items .item").length;
      const animeSearch: ResultSearch<AnimeResult> = {
        nav: {
          count: count,
          current: Number(page),
          next: count < 40 ? 1 : Number(page) + 1,
          hasNext: count < 40 ? false : true,
        },
        results: [],
      };
      $(".row_items .item").each((_i, e) => {
        const animeSearchData: AnimeResult = {
          name: $(e).find(".title").text(),
          image: $(e).find(".cover img").attr("src"),
          url: `/anime/hentaiheven/name/${$(e)
            .find(".title")
            .text()
            .replace(this.url + "/video", "")}`,
        };
        animeSearch.results.push(animeSearchData);
      });
      return animeSearch;
    } catch (error) {
      console.error(error);
    }
  }
}
