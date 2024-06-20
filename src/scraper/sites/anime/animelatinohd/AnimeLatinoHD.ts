import * as cheerio from "cheerio";
import axios from "axios";
import { AnimeMedia } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import CryptoJS from 'crypto-js'

import {
  ResultSearch,
  type IResultSearch,
  type IAnimeResult,
} from "../../../../types/search";
import { AnimeScraperModel } from "../../../../models/AnimeScraperModel";

export class AnimeLatinoHD extends AnimeScraperModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public GetItemByFilter(..._args: unknown[]): Promise<IResultSearch<IAnimeResult>> {
    throw new Error("Method not implemented.");
  }
  
  readonly url = "https://www.animelatinohd.com";
  readonly api = "https://web.animelatinohd.com";
  readonly key = "l7z8rIhQDXIH6pl66ZEQgPkNwkDlilgdOHMMWkxkzzE="

  async GetItemInfo(anime: string): Promise<AnimeMedia> {
    try {
      const { data } = await axios.get(`${this.url}/anime/${anime}`);
      const $ = cheerio.load(data);

      const animeInfoParseObj = JSON.parse(this.decrypt(JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data));
      const AnimeInfo: AnimeMedia = {
        name: animeInfoParseObj.name,
        url: `/anime/animelatinohd/name/${anime}`,
        synopsis: animeInfoParseObj.overview,
        alt_names: [...animeInfoParseObj.name_alternative.split(",")],
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
          num: Number(e.number),
          thumbnail:{
            url :"https://www.themoviedb.org/t/p/original" + animeInfoParseObj.banner + "?&w=280&q=95"
          },
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

      const animeEpisodeParseObj = JSON.parse(this.decrypt(JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data));

      const AnimeEpisodeInfo: Episode = {
        name: animeEpisodeParseObj.anime.name,
        url: `/anime/animelatinohd/episode/${episode}`,
        num: Number(number),
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


      for (let index = 0; index < animeEpisodeParseObj.players[f_index].length; index++) {
            //const warpVideo = await axios.get(this.api +'/video/'+this.encrypt(JSON.stringify(animeEpisodeParseObj.players[f_index][index].id)))
            const Server: EpisodeServer = {
              name: animeEpisodeParseObj.players[f_index][index].server.title,
              url: "",
            };
            Server.url = `${this.api}/video/${this.encrypt(JSON.stringify(animeEpisodeParseObj.players[f_index][index].id))}`;
            Server.name = animeEpisodeParseObj.players[f_index][index].server.title;

            AnimeEpisodeInfo.servers.push(Server); 
        }
       
      
      AnimeEpisodeInfo.servers.sort((a,b) => a.name.localeCompare(b.name))
      return AnimeEpisodeInfo;
    } catch (error) {
      console.log(error);
    }
  }
  
  decrypt(data: string){
    let t = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
    t = JSON.parse(t)
    const a = CryptoJS.enc.Base64.parse(t.iv)
    const n = CryptoJS.AES.decrypt(t.value, CryptoJS.enc.Base64.parse(this.key), {
      iv:a,
      mode:CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(n)
  }
  encrypt(data:string | number){
    let t = CryptoJS.lib.WordArray.random(16)
    let r
    const a = CryptoJS.enc.Base64.parse(this.key)
    const n = {
      iv: t,
      mode:CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  }
   
    const s = CryptoJS.AES.encrypt(data, a, n).toString();

  r = {
      iv: t = CryptoJS.enc.Base64.stringify(t),
      value: s,
      mac: CryptoJS.HmacSHA256(t + s, a).toString()
  };
  r = JSON.stringify(r)
  r = CryptoJS.enc.Utf8.parse(r)
  
  return CryptoJS.enc.Base64.stringify(r)
  }
  async GetAnimeByFilter(
    search?: string,
    type?: number,
    page?: number,
    year?: string,
    genre?: string
  ): Promise<IResultSearch<IAnimeResult>> {
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
  
      const animeSearchParseObj = JSON.parse(this.decrypt(data.data));

      const animeSearch: ResultSearch<IAnimeResult> = {
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
        const animeSearchData: IAnimeResult = {
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
