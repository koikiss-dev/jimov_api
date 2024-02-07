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
                name: $(".Animevostfr .mvi-content .mvic-desc h1").text(),
                url: `/anime/animevostfr/name/${anime}`,
                synopsis: AnimeDescription.slice(AnimeDescription.indexOf("Synopsis:")+"Synopsis:".length,-1),
                alt_name: [...AnimeDescription.slice(AnimeDescription.indexOf("Titre alternatif:")+"Titre alternatif:".length,AnimeDescription.indexOf("Synopsis:")).split("/").filter((n) => n.trim())],
                image: {
                    url: $(".Animevostfr .mvi-content .mvic-thumb img").attr("data-lazy-src")
                },
                genres: [...$(".mvic-info .mvici-left p").first().find("a").next().text().split(",")],
                type: AnimeTypes == "Anime" ? "Anime" : AnimeTypes == "MOVIE" ? "Movie" : "Null" , //tv,pelicula,especial,ova
                status: AnimeStatus == "En cours" ? true : false,
                date: AnimeDate ? { year: AnimeDate } : null,
                episodes: []
            }

            $("#seasonss .les-title").each((_i,e) => {
  
                const AnimeEpisode: Episode = {
                    name: "Episode " + $(e).find("a").text(),
                    number: 4,
                    image: "",
                    url: `/anime/animeblix/episode/${anime+"-"}`
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

            const { data } = await axios.get(`${this.url}/${anime.replace("ver-","")}-${number}`);
            const $ = cheerio.load(data);

            const AnimeEpisodeInfo: Episode = {
                name: number,
                url: `/anime/animeblix/episode/${episode}`,
                number: number,
                image: "",
                servers: []
            }


           $("").map((e) => {

                const Server: EpisodeServer = {
                    name: "e.server.title",
                    url: "",
                }

                Server.url = "https://api.animelatinohd.com/stream/"
                Server.name = String(e)

                AnimeEpisodeInfo.servers.push(Server)
            })

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

