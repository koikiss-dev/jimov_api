import * as cheerio from "cheerio";
import axios from "axios";
import { Anime } from "../../../../types/anime";
import { Episode,EpisodeServer } from "../../../../types/episode";
//import { AnimeSearch, ResultSearch, IResultSearch, IAnimeSearch } from "../../../../types/search";

/** List of Domains
 * https://m.wcostream.org/    (phone)
 * 
 * https://wcopanel.cizgifilmlerizle.com
 * 
 * https://cdn.animationexplore.com
 * https://animationexplore.com
 * 
 * https://watchanimesub.net
 * https://lb.watchanimesub.net
*/



export class WcoStream {
    readonly url = "https://www.wcostream.org";

    ///inc/animeuploads/embed.php?file=Dr.%20Slump%2FDr.%20Slump%20Episode%20001%20-%20Watch%20Dr.%20Slump%20Episode%20001%20online%20in%20high%20quality.flv&hd=1
    async GetAnimeInfo(anime: string): Promise<Anime> {
        try {
            const { data } = await axios.get(`${this.url}/anime/${anime}`);
            const $ = cheerio.load(data);

            let image = $("#category_description .ui-grid-solo .ui-block-a img").attr("src")
            let name = $(".main .ui-grid-solo.center .ui-block-a > .ui-bar.ui-bar-x").text().replace("Share On", "")
            let genre = $(".ui-grid-solo.left .ui-block-a").text().replace("Genre;", "").replace("Language; ", "")

            const AnimeInfo: Anime = {
                name: name,
                url: `/anime/animelatinohd/name/${anime}`,
                synopsis: $("#category_description .ui-grid-solo .ui-block-a div p").text().replace("Watch ", ""),
                image: {
                    url: !image.includes("https://") ? image.replace("//", "https://") : image
                },
                genres: [...genre.replace(genre.includes("Dubbed") ? "Dubbed" : "Subbed", "").trim().split(",").map(v => v.trim())],
                //type: no,
                //status: no ? "En emisión" : "Finalizado",
                //date: no,
                episodes: []
            }

            $("ul.ui-listview-z li").map((_i, e) => {
                let data = $(e).find("a").text()
                let episode = data.slice(data.search(" Episode ")).replace(data.includes("English Dubbed") ? "English Dubbed" : "English Subbed", "").replace("Episode", "").trim()
                if (data) {
                    let AnimeEpisode: Episode = {
                        name: data,
                        number: episode,
                        image: "https://www.themoviedb.org/t/p/original",
                        url: `/anime/wcostream/episode/${$(e).find("a").attr("href").slice(1, $(e).find("a").attr("href").search("episode")) + episode}?id=${image.slice(image.lastIndexOf("/") + 1, image.search(".jpg"))}`//"//cdn.animationexplore.com/catimg/3.jpg
                    }
                    AnimeInfo.episodes.push(AnimeEpisode);
                }
            })
            console.log(AnimeInfo)
            return AnimeInfo;

        } catch (error) {
        }
    }
    // Global Apis https://www.wcostream.org/wp-json/wp/v2/pages

    async GetEpisodeServers(episode: string, _id: any) {
        try {

            let number = episode.substring(episode.lastIndexOf("-") + 1)
            //let anime = episode.substring(0, episode.lastIndexOf("-"))
            //hacklegend-of-the-twilight-episode-12-english-dubbed-2
            let urlafter = await axios.get(`${this.url}/playlist-cat/3/hacklegend-of-the-twilight-episode-12-english-dubbed-2`, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55" } });
            //let cl = await axios.get(`https://m.wcostream.org/hacklegend-of-the-twilight-episode-12-english-dubbed-2`)
            //const fr = cheerio.load(cl.data)
            //console.log(fr("html").html(), id)
            //console.log(`https://www.wcostream.org/hacklegend-of-the-twilight-episode-${number}-english-dubbed-2`)
            //console.log(fr("html").html(),id)
            // console.log(fr.html())
            //https://www.wcostream.org/playlist-cat-rss/3?rssh=4199af2f31c7c2346eba1fa8523a7a46&rsst=1689553671
            //https://www.wcostream.org/dr-slump-episode-1-english-subbed

            const $$ = cheerio.load(urlafter.data);
            var mainUrl = $$("script").get()[3].children[0].data
            var origin = eval(mainUrl.trim().slice(mainUrl.search("playlist:") + 6, mainUrl.search('image: ') - 4).trim().replace(",", ""))
            let sad = await axios.get(this.url + origin,{headers:{ "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55" }})
            let orb = cheerio.load(sad.data.replaceAll(":image"," type='image'").replaceAll(":source"," type='video'").trim())
            
          
            //const $ = cheerio.load(urlafter.data);

            //console.log(cheerio.)
            //console.log($("html").html())
            /*var scr = fr(".ui-block-a script").get()[0].children[0].data
            //https://lb.watchanimesub.net/getvid?evid=tuWPBjr1Sd-HjOm9c_-99yd40E-lu1tKg5CD8GvpB6T5av64CgYvd5mEbmHRDUqhAOoO8ROiy-_aHAE4CJWxSWGjt3uovFUmsRUp75i7K3wsvWOSVEaXK9NbI89TulBFVGG9-Ppwz7YjfFgBERLkCUam7bUAeT-Xaa99Z4m2WrGZ_Rcsc8winDJCcYe-7xbCcMb0vzbPDNjpccUGiu_HZiCLHq9Ie8zjB119fRTwOMMuJ8xHkeCNpFIgHsQoKgx5KZLDJuJk-GlvAdOJhULP6Df2bWyHTAxrRMbj-NEVmVQHzYWNK3F3sYudC44nyNGdiD8pndlLneH2_vBtnuBeBdlHqbVy7MExtALRHyR-wCqoXIWFFpD8aeGkOvNH8aUXyrjkgzCNQKj3FTS9hyAO9A
            var enumList = "";
            var randomVar = eval(scr.slice(scr.search(' = "";') + 16, scr.search('"];') + 2).trim())
            var randomNumber = Number(scr.slice(scr.search("replace") + 20, scr.lastIndexOf("); } );")).trim())
            randomVar.map((e: any, _i: any) => {
                enumList += String.fromCharCode(parseInt(atob(e).replace(/\D/g, '')) - randomNumber);
            })
            console.log(enumList,id)*/
            //console.log(eval(decodeURIComponent(escape(enumList))))
            //var embed = new URL(enumList.slice(enumList.search('src="')+5,enumList.search('" frameborder="0"')))
            //var t = embed.searchParams.get("t")
            //var h = embed.searchParams.get("h")
            //var pid= embed.searchParams.get("pid") // id episode
            //let {data} = await axios.get();
            // console.log(`https://www.wcostream.org/playlist-cat-rss/${id}?rssh=${h}&rsst=${t}`)
            //await fetch(`https://www.wcostream.org/playlist-cat-rss/${id}?rssh=${h}&rsst=${t}`).then((e) => e.json()).then((e) => console.log(e))
            //const $q = cheerio.load(data)
            //console.log(t,h,id)
            //console.log($q("html").html())
            // after 

            const AnimeEpisodeInfo: Episode = {
                name: "",
                url: `/anime/wcostream/episode/${episode}`,
                number: number,
                image: "",
                servers: []
            }
            /* $("#languaje option").each((_i, el) => {
                 let v = Number($(el).val());
                 animeEpisodeParseObj.players[v].map((e: { server: { title: any; }; id: any; }) => {
                     let Server: EpisodeServer = {
                         name: "",
                         url: String(e),
                     }
                     AnimeEpisodeInfo.servers.push(Server);
                 })
             })*/

             orb("item").each((_i,e) => {

                let Server: EpisodeServer = {
                    name: "",
                    url: orb(e).find("jwplayer[type='video']").attr("file"),
                }
           
                AnimeEpisodeInfo.servers.push(Server);
            })
            return AnimeEpisodeInfo;
        } catch (error) {
            console.log(error)
        }
    }

    /*async GetAnimeByFilter(search?: string, type?: number, page?: number, year?: string, genre?: string): Promise<IResultSearch<IAnimeSearch>> {
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

            let animeSearchParseObj = data

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
        }
    }*/

}


