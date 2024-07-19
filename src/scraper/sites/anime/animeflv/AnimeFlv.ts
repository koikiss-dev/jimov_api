import axios from "axios";
import { load } from "cheerio";
import { AnimeMedia, Chronology } from "../../../../types/anime";
import { Episode } from "../../../../types/episode";
import {
  Genres,
  OrderAnimeflv,
  StatusAnimeflv,
  TypeAnimeflv,
} from "./animeflv_helper";
import {
  ResultSearch,
  type IResultSearch,
  type IAnimeResult,
  AnimeResult,
} from "../../../../types/search";
import { AnimeScraperModel } from "../../../../models/AnimeScraperModel";

export class AnimeFlv extends AnimeScraperModel {
  readonly url = "https://m.animeflv.net";

  async GetItemInfo(anime: string): Promise<AnimeMedia> {
    try {
      const { data } = await axios.get(`${this.url}/anime/${anime}`);
      const $ = load(data);

      //relevant information
      const title = $("h1.Title").text().trim();
      const title_alt = title;
      const img = $("meta[property='og:image']").attr("content");
      const status = $("p strong.Anm-On").text();
      const synopsis = $("header p:contains(Sinopsis)")
        .text()
        .replace("Sinopsis:", "")
        .trim();

      //container of episodes
      const episodesContainer = $("div.List-Episodes div.AACrdn");

      const AnimeReturn = new AnimeMedia();
      AnimeReturn.name = title;
      AnimeReturn.alt_names = [...title_alt.split(",")];
      AnimeReturn.image = {
        url: img,
      };
      AnimeReturn.status = status;
      AnimeReturn.synopsis = synopsis;
      AnimeReturn.chronology = [];
      AnimeReturn.genres = [];
      AnimeReturn.episodes = [];

      //getRelated
      $("ul.ListAnmRel li a").each((_i, e) => {
        const cro = new Chronology();
        cro.name = $(e).text().trim();
        cro.url = `/anime/flv/name/${$(e).attr("href").replace("/anime/", "")}`;
        AnimeReturn.chronology.push(cro);
      });

      //get genres
      $("footer a").each((_i, e) => {
        const gen = $(e).text().trim() as string;

        AnimeReturn.genres.push(gen);
      });

      //get episodes
      episodesContainer.each((_i_, e) => {
        $(e)
          .find("ul li")
          .each((_i, e) => {
            const link = $(e).find("a");
            const name = link.text().trim();
            const numberEpisode = Number(name.split(" ").slice(-1));
            console.log(numberEpisode);
            const episode = new Episode();
            episode.name = name;
            episode.url = `/anime/flv/episode/${link
              .attr("href")
              .replace("/ver/", "")}`;
            episode.num = numberEpisode;

            AnimeReturn.episodes.push(episode);
          });
      });
      return AnimeReturn;
    } catch (error) {
      console.log(
        "An error occurred while getting the anime info: invalid name",
        error
      );
      throw new Error(
        "An error occurred while getting the anime info: invalid name"
      );
    }
  }

  async GetItemByFilter(
    gen?: Genres | string,
    date?: string,
    type?: TypeAnimeflv,
    status?: StatusAnimeflv,
    ord?: OrderAnimeflv,
    page?: number,
    title?: string
  ): Promise<IResultSearch<IAnimeResult>> {
    try {
      const { data } = await axios.get(`${this.url}/browse`, {
        params: {
          genres: gen || "all",
          year: date || "all",
          status: status || "all",
          Tipo: type || "all",
          order: ord || 1,
          page: page || 1,
          q: title,
        },
      });
      const $ = load(data);
      const infoList = $("ul.ListAnimes li");
      const data_filter = new ResultSearch<IAnimeResult>();
      data_filter.results = [];
      infoList.each((_i, e) => {
        const info = new AnimeResult();
        info.name = $(e).find("h3").text().trim();
        info.image =
          $(e)
            .find("a")
            .attr("href")
            .replace("/anime/", "https://img.animeflv.ws/cover/") + ".jpg";
        info.url = `/anime/flv/name/${$(e)
          .find("a")
          .attr("href")
          .replace("/anime/", "")}`;
        info.type = $(e).find("span.Type").first().text().trim();
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
      const { data } = await axios.get(`${this.url}/ver/${episode}`);
      const $ = load(data);
      const title = $("h1").text().trim();
      const getLinks = $("script");
      const numberEpisode = episode.substring(episode.lastIndexOf("-") + 1);
      const episodeReturn = new Episode();
      episodeReturn.name = title;
      episodeReturn.url = `/anime/flv/episode/${episode}`;
      episodeReturn.num = Number(numberEpisode);
      episodeReturn.servers = [];

      getLinks.each((_i, e) => {
        interface VideoObject {
          title: string;
          code: string;
        }

        const scriptContent = $(e).html();
        const regexVideoObject = /var videos = (\{.*?\});/;

        const matchObject = scriptContent.match(regexVideoObject);

        if (matchObject) {
          const videoObject: VideoObject[] = JSON.parse(matchObject[1]).SUB;

          for (let index = 0; index < videoObject.length; index++) {
            const element = videoObject[index];

            episodeReturn.servers.push({
              name: element.title,
              url: element.code,
            });
          }
        }
      });
      /*const promises = getLinks.map(async (_i, e) => {
        /* const servers = new EpisodeServer();
        const title = $(e).find("a").text().trim();
        const videoData = $(e).attr("data-video");
        servers.name = title;
        servers.url = videoData;
        console.log(title); */

      /* if (videoData.includes("streaming.php")) {
          await this.getM3U(
            `${videoData.replace("streaming.php", "ajax.php")}&refer=none`
          ).then((g) => {
            if (g.source.length) {
              servers.file_url = g.source[0].file;
            }
          });
        }
        switch (title) {
          case "Mega":
            servers.file_url = videoData
              .replace("embed#!", "file/")
              .replace("!", "#");
            break;
          case "Streamtape":
            servers.file_url = videoData.replace("/e/", "/v/");
            break;
          case "YourUpload":
            servers.file_url = videoData.replace("/embed/", "/watch/");
            break;
          case "Vidlox":
          case "Doodstream":
          case "Streamsb":
          case "Filemoon":
            servers.file_url = videoData.replace("/e/", "/d/");
            break;
          default:
            break;
        }
        episodeReturn.servers.push(servers); 
      })*/
      //await Promise.all(promises);
      return episodeReturn;
    } catch (error) {
      console.log("An error occurred while getting the episode servers", error);
      throw new Error("An error occurred while getting the episode servers");
    }
  }

  /* private async getM3U(vidurl: string) {
    try {
      const res = await axios.get(vidurl);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  } */
}
