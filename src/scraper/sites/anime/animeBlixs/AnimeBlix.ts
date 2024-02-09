import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import { AnimeSearch, ResultSearch, IResultSearch, IAnimeSearch } from "../../../../types/search";
//import { Calendar } from "@animetypes/date";

/** List of Domains
 * https://vwv.animeblix.org
 * 
 * https://animeblix.xyz
 * 
 * https://animeblix.com
 * 
*/

export class AnimeBlix {
    readonly url = "https://vwv.animeblix.org";
    readonly api = "https://api.animelatinohd.com";

    async GetAnimeInfo(anime: string): Promise<Anime> {
        try {
            const { data } = await axios.get(`${this.url}/animes/${anime.includes("ver-") ? anime : "ver-"+anime}`);
            const $ = cheerio.load(data);

            const AnimeTypes = $(".cn .info .r .u li span:contains('Tipo:')").next()
            const AnimeStatus = $(".cn .info .r .u li span[class='em']").length ? $(".cn .info .r .u li span[class='em']").text() : $(".cn .info .r .u li span[class='fi']").length ? $(".cn .info .r .u li span[class='fi']").text() : $(".cn .info .r .u li span[class='es']").text()
            const AnimeDate = $(".cn .info .r .u li span:contains('Fecha de emisión:')").next().text().trim().replace(" -", "").split(" ")

            const Dates = AnimeDate[0] ? new Date(String(AnimeDate[0])) : null
            const DateFormat = new Intl.DateTimeFormat("en", { day: "numeric", month: "numeric", year: "numeric" }).format(Dates).split("/")


            const AcceptAlts = $(".cn .info .r .u").next().find("li").text().replace("Nombre original: ", "").replace("Nombre en inglés: ", "---").replace("Nombre en japones: ", "---")

            let AltsSlice: number = 0

            if (AcceptAlts.includes("Támbien conocido como:")) {
                AltsSlice = AcceptAlts.indexOf("Támbien conocido como:")
            } else if (AcceptAlts.includes("Estudio(s):")) {
                AltsSlice = AcceptAlts.indexOf("Estudio(s):")
            } else if (AcceptAlts.includes("Producido por:")) {
                AltsSlice = AcceptAlts.indexOf("Producido por:")
            } else if (AcceptAlts.includes("Licenciada por:")) {
                AltsSlice = AcceptAlts.indexOf("Licenciada por:")
            }

            const AltNames = AcceptAlts.slice(0, AltsSlice)
            const AnimeInfo: Anime = {
                name: $(".cn .ti h1 strong").text(),
                url: `/anime/animeblix/name/${anime}`,
                synopsis: $(".cn .info .r .tx .content p").first().text(),
                alt_name: [...AltNames.split("---")],
                image: {
                    url: $(".cn .info .l .i img").attr("data-src")
                },
                genres: [...$(".cn .info .r .gn li").text().split(",")],
                type: AnimeTypes.length ? AnimeTypes.text() == "TV" ? "Anime" : AnimeTypes.text() == "Pelicula" ? "Movie" : AnimeTypes.text() == "Ova" ? "OVA" : "Null" : "Null", //tv,pelicula,especial,ova
                status: AnimeStatus,
                date: AnimeDate[0] ? { year: DateFormat[2], month: DateFormat[1], day: DateFormat[0] } : null,
                episodes: []
            }

            const ListEpisodeIndex = $(".sc .cn #l").html()
            const RemoveSymbols: RegExp = /[^0-9,]+/g;
            const ReplaceSymbols: RegExp = /(,)+/g;
            const ListEpisode = ListEpisodeIndex.slice(ListEpisodeIndex.indexOf("var eps = "), ListEpisodeIndex.indexOf(";</") - 1).replace(RemoveSymbols, "").replace(ReplaceSymbols, ",").slice(0, ListEpisodeIndex.lastIndexOf(",", -1)).split(",")
         
            ListEpisode.map((e) => {
                const AnimeEpisode: Episode = {
                    name: "Episode " +e,
                    number: e,
                    image: "",
                    url: `/anime/animeblix/episode/${anime+"-"+e}`
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


