import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import { AnimeSearch, ResultSearch, IResultSearch, IAnimeSearch } from "../../../../types/search";

export class AnimeLatinoHD {
    readonly url = "https://www.animelatinohd.com";
    readonly api = "https://api.animelatinohd.com";

    async GetAnimeInfo(anime: string): Promise<Anime> {
        try {
            const { data } = await axios.get(`${this.url}/anime/${anime}`);
            const $ = cheerio.load(data);

            const animeInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data
            const Dates = new Date(String(animeInfoParseObj.aired))
            const DateFormat = new Intl.DateTimeFormat("en",{day:"numeric",month:"numeric",year:"numeric"}).format(Dates).split("/")
            
            const AnimeInfo: Anime = {
                name: animeInfoParseObj.name,
                url: `/anime/animelatinohd/name/${anime}`,
                synopsis: animeInfoParseObj.overview,
                alt_name: [...animeInfoParseObj.name_alternative.split(",")],
                image: {
                    url: "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.poster + "?&w=53&q=95"
                },
                genres: [...animeInfoParseObj.genres.split(",")],
                type: animeInfoParseObj.type,
                status: animeInfoParseObj.status == 1 ? "En emisión" : "Finalizado",
                date: {year:DateFormat[2],month:DateFormat[1],day:DateFormat[0]},
                episodes: []
            }

            animeInfoParseObj.episodes.map(e => {
                const AnimeEpisode: Episode = {
                    name: animeInfoParseObj.name,
                    number: e.number + "",
                    image: "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.banner + "?&w=280&q=95",
                    url: `/anime/animelatinohd/episode/${animeInfoParseObj.slug + "-" + e.number}`
                }

                AnimeInfo.episodes.push(AnimeEpisode);
            })

            return AnimeInfo;

        } catch (error) {
            console.log(error)
        }
    }
    async GetEpisodeServers(episode: string, lang: string): Promise<Episode> {
        try {

            const number = episode.substring(episode.lastIndexOf("-") + 1)
            const anime = episode.substring(0, episode.lastIndexOf("-"))
            const langType = [{ lang: "es", type: "Latino" }, { lang: "jp", type: "Subtitulado" }]

            const { data } = await axios.get(`${this.url}/ver/${anime}/${number}`);
            const $ = cheerio.load(data);

            const animeEpisodeParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data

            const AnimeEpisodeInfo: Episode = {
                name: animeEpisodeParseObj.anime.name,
                url: `/anime/animelatinohd/episode/${episode}`,
                number: number,
                image: "",
                servers: []
            }

            const sel_lang = langType.filter((e) => e.lang == lang)
            let f_index = 0

            if (sel_lang.length) {
                $("#languaje option").each((_i, e) => {
                    if ($(e).text() == sel_lang[0].type) {
                        f_index = Number($(e).val())
                    }
                })
            } else {
                $("#languaje option").each((_i, e) => {
                    f_index = Number($(e).val())
                })
            }

            await Promise.all(animeEpisodeParseObj.players[f_index].map(async (e: { server: { title: string; }; id: string; }) => {
               //const min = await axios.get("https://filemoon.sx/e/smone1s7jjxv/CYM01HNMCGTSKT")
               //const pageload = await BrowserHandler("https://animelatinohd.com/")
               
                const Server: EpisodeServer = {
                    name: e.server.title,
                    url: "",
                }
                //const cookies = [{name: 'v_id', value: "https://api.animelatinohd.com/stream/"+e.id},];
                Server.url = "https://api.animelatinohd.com/stream/" + e.id
                Server.name = e.server.title
                
               
                
                //await pageload.page.setCookie(...cookies)
                /*await pageload.page.evaluate(()=>{
                    function getCookie(cname) {
                        const name = cname + "=";
                        const decodedCookie = decodeURIComponent(document.cookie);
                        const ca = decodedCookie.split(';');
                        for(let i = 0; i <ca.length; i++) {
                          let c = ca[i];
                          while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                          }
                          if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                          }
                        }
                        return "";
                      }
                      
                      window.location.href =getCookie("v_id")
   
                })
                await pageload.page.waitForNavigation()
                const url = await pageload.page.url()
                pageload.browser.close()


                const min = await axios.get(url)
                const unp = await RuntimeUnpacked(Buffer.from(min.data).toString('base64'))

                Server.url = unp*/

                //state 1
                /*if (e.server.title == "Beta") {
                   let sel = dat("script:contains('var foo_ui = function (event) {')")
                   let sort = String(sel.html())
                   let domain = eval(sort.slice(sort.search("const url"), sort.search("const langDef")).replace("const url =", "").trim())

                   let sortMORE = sort.slice(sort.search('ajax'), sort.search("method: 'post',"))
                   let obj_sort = sortMORE.replace("ajax({", "").trim().replace("url:", "").replace(",", "").replace('"', "").replace('"', "").trim()
                   let id_file = obj_sort.slice(obj_sort.lastIndexOf("/"), obj_sort.length)
                   Server.url = domain + "/v" + id_file

               } else if (e.server.title == "Gamma") {
                   Server.url = dat('meta[name="og:url"]').attr("content")
               } else {
                   let sel = dat("script[data-cfasync='false']")
                   let sort = String(sel.html())
                   let sortMORE = sort.slice(sort.lastIndexOf("master") + 7, sort.lastIndexOf("hls2") - 11)
                   let id_file = sortMORE.replace("_x", "")
                   Server.url = "https://filemoon.sx" + "/e/" + id_file
               }*/

                AnimeEpisodeInfo.servers.push(Server)
            }))

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


