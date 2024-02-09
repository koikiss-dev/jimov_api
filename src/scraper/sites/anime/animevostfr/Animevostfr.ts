import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import { AnimeSearch, ResultSearch, IResultSearch, IAnimeSearch } from "../../../../types/search";
//import { Calendar } from "@animetypes/date";

/** List of Domains
 * 
 * https://animevostfr.tv
 * 
*/

export class Animevostfr {
    readonly url = "https://animevostfr.tv";
    readonly api = "https://api.animelatinohd.com";

    async GetAnimeInfo(anime: string): Promise<Anime> {
        try {
            const { data } = await axios.get(`${this.url}/${anime}`);
            const $ = cheerio.load(data);


            const AnimeTypes = $(".mvic-info .mvici-right p strong:contains(' Type:')").nextAll().text()
            const AnimeStatus = $(".mvic-info .mvici-right p a[rel='tag']").first().text()
            const AnimeDate = $(".mvic-info .mvici-right p strong:contains(' An:')").nextAll().text()
            const AnimeDescription = $(".mvi-content .mvic-desc .desc p").html()




            const AnimeInfo: Anime = {
                name: $(".mvi-content .mvic-desc h1").text(),
                url: `/anime/animevostfr/name/${anime}`,
                synopsis: AnimeDescription.slice(AnimeDescription.indexOf("Synopsis:") + "Synopsis:".length, -1).trim(),
                alt_name: [...AnimeDescription.slice(AnimeDescription.indexOf("Titre alternatif:") + "Titre alternatif:".length, AnimeDescription.indexOf("Synopsis:")).replace("<br>\n", "").split("/").map((n) => n.replace(/^\s+|\s+$|\s+(?=\s)/g, ""))],
                image: {
                    url: $(".mvi-content .mvic-thumb img").attr("data-lazy-src")
                },
                genres: [...$(".mvic-info .mvici-left p").first().text().replace("\n Genres:\n ", "").split(",").map((n) => n.replace(/^\s+|\s+$|\s+(?=\s)/g, ""))],
                type: AnimeTypes == "Anime" ? "Anime" : AnimeTypes == "MOVIE" ? "Movie" : "Null", //tv,pelicula,especial,ova
                status: AnimeStatus == "En cours" ? true : false,
                date: AnimeDate ? { year: AnimeDate } : null,
                episodes: []
            }

            $("#seasonss .les-title").each((_i, e) => {

                const number = $(e).find("a").attr("href").substring($(e).find("a").attr("href").lastIndexOf("-") + 1).replace("/", "")
                const AnimeEpisode: Episode = {
                    name: "Episode " + number,
                    number: number,
                    image: "",
                    url: `/anime/animevostfr/episode/${anime + "-" + number}`
                }

                AnimeInfo.episodes.push(AnimeEpisode);
            })

            return AnimeInfo;

        } catch (error) {
            console.log(error)
        }
    }
    async GetEpisodeServers(episode: string): Promise<Episode> {
        try {

            const number = episode.substring(episode.lastIndexOf("-") + 1)
            const anime = episode.substring(0, episode.lastIndexOf("-"))

            const { data } = await axios.get(`${this.url}/episode/${anime}-episode-${number}`);
            const $ = cheerio.load(data);
            const s = $('.form-group.list-server select option')
            const e = $('.list-episodes select option')
            const ListFilmId = []
            const ListServer = []

            s.map((_i, e) => ListServer.push($(e).val()))
            e.map((_i, e) => ListFilmId.push($(e).attr("episodeid")))

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
                servers: []
            }

            await Promise.all(ListServer.map(async (n) => {
                const servers = await axios.get(`${this.url}/ajax-get-link-stream/?server=${n}&filmId=${ListFilmId[0]}`)
                let currentData = servers.data
                if (n == "opencdn" || n == "photo") {
                    currentData = currentData.replace("?logo=https://animevostfr.tv/1234.png", "").replace("short.ink/", "abysscdn.com/?v=")
                }
                const Servers: EpisodeServer = {
                    name: n,
                    url: currentData,
                }
                AnimeEpisodeInfo.servers.push(Servers)
            }))



            AnimeEpisodeInfo.servers.sort((a: EpisodeServer, b: EpisodeServer) => a.name.length - b.name.length)
            return AnimeEpisodeInfo;
        } catch (error) {
            console.log(error)
        }
    }

    async GetAnimeByFilter(search?: string, type?: number, page?: number, year?: string, genre?: string): Promise<IResultSearch<IAnimeSearch>> {
        try {
            const { data } = await axios.get(`${this.api}/api/anime/list`, {
                params: {
                    search: search,
                    type: type,
                    year: year,
                    genre: genre,
                    page: page
                }
            });

            const animeSearchParseObj = data

            const animeSearch: ResultSearch<IAnimeSearch> = {
                nav: {
                    count: animeSearchParseObj.data.length,
                    current: animeSearchParseObj.current_page,
                    next: animeSearchParseObj.data.length < 28 ? 0 : animeSearchParseObj.current_page + 1,
                    hasNext: animeSearchParseObj.data.length < 28 ? false : true
                },
                results: []
            }
            animeSearchParseObj.data.map(e => {
                const animeSearchData: AnimeSearch = {
                    name: e.name,
                    image: "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95",
                    url: `/anime/animelatinohd/name/${e.slug}`,
                    type: ""
                }
                animeSearch.results.push(animeSearchData)
            })
            return animeSearch;
        } catch (error) {
            console.log(error)
        }
    }

}

