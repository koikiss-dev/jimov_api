import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "@animetypes/anime";
import { Episode, EpisodeServer } from "@animetypes/episode";
import { IResultSearch, IAnimeSearch, ResultSearch, AnimeSearch } from "@animetypes/search";

/** List of Domains
 * https://m.wcostream.org (phone)
 * 
 * https://wcopanel.cizgifilmlerizle.com
 * https://neptun.cizgifilmlerizle.com
 * 
 * https://ndisk[>1].cizgifilmlerizle.com
 * https://neptun[>1].cizgifilmlerizle.com
 * 
 * https://cdn.animationexplore.com
 * https://animationexplore.com
 * 
 * https://watchanimesub.net
 * https://lb.watchanimesub.net
 * 
 * https://www.wcopremium.tv
*/

//Default Set Axios Cookie
axios.defaults.withCredentials = true
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55";

export class WcoStream {
    readonly url = "https://www.wcostream.org";

    async GetAnimeInfo(anime: string): Promise<Anime> {
        try {
            const { data } = await axios.get(`${this.url}/anime/${anime}`);
            const $ = cheerio.load(data);

            let image = $("#category_description .ui-grid-solo .ui-block-a img").attr("src")
            let name = $(".main .ui-grid-solo.center .ui-block-a > .ui-bar.ui-bar-x").text().replace("Share On", "")
            let genre = $(".ui-grid-solo.left .ui-block-a").text().replace("Genre;", "").replace("Language; ", "")

            const AnimeInfo: Anime = {
                name: name,
                url: `/anime/wcostream/name/${anime}`,
                synopsis: $("#category_description .ui-grid-solo .ui-block-a div p").text().replace("Watch ", "").replace(/\n/g, ""),
                image: {
                    url: !image.includes("https://") ? image.replace("//", "https://") : image
                },
                genres: [...genre.replace(genre.includes("Dubbed") ? "Dubbed" : "Subbed", "").trim().replace(/\n/g, "").replace(/\s+/g, "").replace("-", "").split(",").map(v => v.trim())],
                episodes: []
            }

            $("ul.ui-listview-z li").map((_i, e) => {
                let data = $(e).find("a").text()
                let episode = data.slice(data.search(" Episode ")).replace(data.includes("English Dubbed") ? "English Dubbed" : "English Subbed", "").replace("Episode", "").trim().replace(/[^0-9-.]/g, "")
                let season = data.includes("Season") ? data.slice(data.search(" Season "), data.search(" Episode ")).replace("Season", "").trim() : ""

                if (data) {
                    let AnimeEpisode: Episode = {
                        name: data,
                        number: episode,
                        image: `https://cdn.animationexplore.com/thumbs/${$(e).find("a").attr("href").replace("https://www.wcostream.org/", "").replace("/", "").replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, "-")}.jpg`,
                        url: `/anime/wcostream/episode/${anime.replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s+/g, "-") + "-" + episode}${season ? "?season=" + season : ""}`
                    }

                    AnimeInfo.episodes.push(AnimeEpisode);
                }
            })

            return AnimeInfo;

        } catch (error) {
        }
    }

    // Global Apis https://www.wcostream.org/wp-json
    // https://www.wcostream.org/wp-json/wp/v2/pages

    async GetEpisodeServers(episode: string, season: any) {
        try {

            let NumEpisode = episode.substring(episode.lastIndexOf("-") + 1)
            let anime = episode.substring(0, episode.lastIndexOf("-"))

            const { data } = await axios.get(`https://www.wcostream.org/playlist-cat/${anime}`)
            const $ = cheerio.load(data);

            let mainUrl = $("script").get()[3].children[0].data
            let mainOrigin = eval(mainUrl.trim().slice(mainUrl.search("playlist:") + 6, mainUrl.search('image: ') - 4).trim().replace(",", ""))

            const mainData = await axios.get(this.url + mainOrigin)
            const $$ = cheerio.load(mainData.data.replaceAll(":image", " type='image'").replaceAll(":source", " type='video'").trim())

            const AnimeEpisodeInfo: Episode = {
                name: "",
                url: `/anime/wcostream/episode/${episode}${season ? "?season=" + season : ""}`,
                number: NumEpisode,
                image: "",
                servers: []
            }

            $$("item").each((_i, e) => {
                let title = $$(e).find("title").text()

                if (title.includes("Episode " + NumEpisode + " ") && !season && !title.includes("Season")) {
                    AnimeEpisodeInfo.name = title.replace("<![CDATA[", "").replace("]]>", "").trim()
                    AnimeEpisodeInfo.image = $$(e).find("jwplayer[type='image']").text()
                    let Server: EpisodeServer = {
                        name: "JWplayer - " + $$(e).find("jwplayer[type='video']").attr("label"),
                        url: $$(e).find("jwplayer[type='video']").attr("file"),
                    }

                    AnimeEpisodeInfo.servers.push(Server);
                } else if (title.includes("Episode " + NumEpisode + " ") && season && title.includes("Season " + season)) {
                    AnimeEpisodeInfo.name = title.replace("<![CDATA[", "").replace("]]>", "").trim()
                    AnimeEpisodeInfo.image = $$(e).find("jwplayer[type='image']").text()
                    let Server: EpisodeServer = {
                        name: "JWplayer - " + $$(e).find("jwplayer[type='video']").attr("label"),
                        url: $$(e).find("jwplayer[type='video']").attr("file"),
                    }

                    AnimeEpisodeInfo.servers.push(Server);
                }
            })
            return AnimeEpisodeInfo;
        } catch (error) {
            console.log(error)
        }
    }

    async GetAnimeByFilter(search?: string, page?: any): Promise<IResultSearch<IAnimeSearch>> {
        try {
            const formdata = new FormData();
            formdata.append("catara", search);
            formdata.append("konuara", "series");

            const { data } = await axios.post(`${this.url}/search`, formdata);
            const $ = cheerio.load(data)

            const animeSearch: ResultSearch<IAnimeSearch> = {
                nav: {
                    count: $("#blog .cerceve").length,
                    current: Number(page ? page : 1),
                    next: $("#blog .cerceve").length < 28 ? 0 : page ? Number(page) + 1 : 2,
                    hasNext: $("#blog .cerceve").length < 28 * page ? false : true
                },
                results: []
            }

            $("#blog .cerceve").each((i, e) => {
                if ((animeSearch.nav.current > 1 ? i - 1 : i) >= 28 * (animeSearch.nav.current - 1) && (animeSearch.nav.current > 1 ? i + 1 : i) <= 28 * animeSearch.nav.current) {
                    const animeSearchData: AnimeSearch = {
                        name: $(e).find(".iccerceve a").attr("title"),
                        image: $(e).find(".iccerceve a img").attr("src"),
                        url: `/anime/wcostream/name/${$(e).find(".iccerceve a").attr("href").replace("/anime/", "")}`,
                        type: "anime"
                    }
                    animeSearch.results.push(animeSearchData)
                }
            })
            return animeSearch;
        } catch (error) {
            console.log(error)
        }
    }

}


