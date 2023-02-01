import * as cheerio from "cheerio";
import axios from "axios";

const animelatinohdFunctions = {}
const url = "https://www.animelatinohd.com"

class Anime {
    constructor() {
        this.title = String();
        this.self = String();
        this.image = String();
        this.banner = String();
        this.description = String();

        this.state = String();
        this.release = String();

        this.genre = new Array();
        this.alternatetitles = new Array();
        this.episodes = new Array();
    }
}

class AnimeEpisode {
    constructor() {
        this.title_episode = String();

        this.next_episode = String();
        this.prev_episode = String();
        this.list_episode = String();

        this.servers = new Array();
    }
}

class AnimeRecentEpisodes {
    constructor() {
        this.releases = new Array();
    }
}

/* This form of collecting this information will be updated (TokyoTF) $("#__NEXT_DATA__") */
animelatinohdFunctions.animeinfo = async (req, res) => {

    let { title } = req.params

    try {
        const { data } = await axios.get(`${url}/anime/${title}`);
        const $ = cheerio.load(data);
        const AnimeInfo = new Anime();

        AnimeInfo.title = $(".Anime_column__P8LV- h1").text();
        AnimeInfo.self = title;
        AnimeInfo.state = $(".Anime_info__u9KqV .Anime_list__1KPll .Anime_item__q7dUv:nth-child(3)").text().replace("Estado ", "")
        AnimeInfo.release = $(".Anime_info__u9KqV .Anime_list__1KPll .Anime_item__q7dUv:nth-child(5)").text().replace("Estreno ", "")
        AnimeInfo.alternatetitles.push(...$(".Anime_info__u9KqV .Anime_list__1KPll .Anime_item__q7dUv:nth-child(6)").text().replace("Titulos Alternativos ", "").split(","))
        AnimeInfo.banner = $(".Anime_container__19VOn .Anime_banner__YN-Gl").attr("style").replace("background-image:url(", "").replace(")", "") + "?&w=280&q=95";
        AnimeInfo.image = $("head").find('meta[name="og:image"]').attr("content") + "?&w=280&q=95";
        AnimeInfo.description = $(".Anime_overview__3j1JB p").text();




        if ($(".Anime_genres__STQYR a").length < 0) {
            AnimeInfo.genre.push($(".Anime_genres__STQYR a").attr("title"));
        } else {
            $(".Anime_genres__STQYR .Anime_item__q7dUv").each((i, e) => {
                AnimeInfo.genre.push($(e).attr("title"));
            })
        }
        if ($(".Anime_details__1vF_2 .Anime_listEpisodes__1KGdz .EpisodeCard_container__8iff3").length < 0) {
            let AnimeEpisode = {
                name: String(),
                link: String(),
                episode_number: Number()
            }

            AnimeEpisode.name = $("Anime_details__1vF_2 .Anime_listEpisodes__1KGdz .EpisodeCard_container__8iff3").find(".EpisodeCard_text__nITZ3 .EpisodeCard_title__1JJd5 .EpisodeCard_limit__sn9IQ").text();
            AnimeEpisode.episode_number = $(".Anime_details__1vF_2 .Anime_listEpisodes__1KGdz .EpisodeCard_container__8iff3").find(".EpisodeCard_text__nITZ3 .EpisodeCard_title__1JJd5 .EpisodeCard_episode__Vs_Do").text().replace("Ep. ");
            AnimeEpisode.link = "/anime/animelatinohd/" + title + "/episode/" + AnimeEpisode.episode_number;
            AnimeInfo.episodes.push(AnimeEpisode);
        } else {
            $(".Anime_details__1vF_2 .Anime_listEpisodes__1KGdz .EpisodeCard_container__8iff3").each((i, e) => {
                let AnimeEpisode = {
                    name: String(),
                    link: String(),
                    episode_number: Number()
                }
                AnimeEpisode.name = $(e).find(".EpisodeCard_text__nITZ3 .EpisodeCard_title__1JJd5 .EpisodeCard_limit__sn9IQ").text();
                AnimeEpisode.episode_number = $(e).find(".EpisodeCard_text__nITZ3 .EpisodeCard_title__1JJd5 .EpisodeCard_episode__Vs_Do").text().replace("Ep. ", "");
                AnimeEpisode.link = "/anime/animelatinohd/" + title + "/episode/" + AnimeEpisode.episode_number;
                AnimeInfo.episodes.push(AnimeEpisode);
            })
        }


        res.status(200).send(AnimeInfo);
    } catch (error) {
        return false;
    }
}

animelatinohdFunctions.animeEpisodeinfo = async (req, res) => {

    let { title, episode } = req.params
    try {
        const { data } = await axios.get(`${url}/ver/${title}/${episode}`);
        const $ = cheerio.load(data);
        const AnimeEpisodeInfo = new AnimeEpisode();

        AnimeEpisodeInfo.title_episode = $(".Episode_column__1WR-L .Episode_info__CduBf .Episode_details__14-Ri .Episode_info__CduBf h1 a").text()

        $(".Episode_column__1WR-L .Episode_actions__JiaFb .Episode_button__3yz57").each((i, e) => {

            if ($(e).text().includes("Anterior")) {
                !AnimeEpisodeInfo.next_episode ? AnimeEpisodeInfo.next_episode = false : ""
                AnimeEpisodeInfo.prev_episode = $(e).attr("href").replace("/ver/" + title + "/", "/anime/animelatinohd/" + title + "/episode/")
            } else if ($(e).text().includes("Siguiente")) {
                !AnimeEpisodeInfo.prev_episode ? AnimeEpisodeInfo.prev_episode = false : ""
                AnimeEpisodeInfo.next_episode = $(e).attr("href").replace("/ver/" + title + "/", "/anime/animelatinohd/" + title + "/episode/")
            }

        })

        AnimeEpisodeInfo.list_episode = `/anime/animelatinohd/${title}`

        let ServersParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data

        $("#languaje option").each((i, el) => {
            let v = $(el).val();
            let t = $(el).text();
            ServersParseObj.players[v].map(e => {
                let ServerObj = {
                    lang_id: String(),
                    lang_name: String(),
                    server: String(),
                    server_name: String()
                }
                ServerObj.lang_id = e.languaje
                ServerObj.lang_name = t
                ServerObj.server = "https://api.animelatinohd.com/stream/" + e.id
                ServerObj.server_name = e.server.title

                AnimeEpisodeInfo.servers.push(ServerObj)
            })
        })

        res.status(200).send(AnimeEpisodeInfo)
    } catch (error) {
        return false;
    }
}


animelatinohdFunctions.animeRecentEpisodesinfo = async (req, res) => {
    try {
        const { data } = await axios.get(`${url}`);
        const $ = cheerio.load(data);

        const AnimeRecentEpisodesObjInfo = new AnimeRecentEpisodes();
        let ObjRelease = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.releases
        ObjRelease.map(e => {
            let AnimeRecent = {
                title: String(),
                poster: String(),
                banner: String(),
                release: String(),
                episode_number: Number(),
                episode: String()
            }
            AnimeRecent.title = e.anime.name
            AnimeRecent.poster = "https://www.themoviedb.org/t/p/original" + e.anime.poster + "?&w=53&q=95"
            AnimeRecent.banner = "https://www.themoviedb.org/t/p/original" + e.anime.banner + "?&w=280&q=95"
            AnimeRecent.release = e.created_at
            AnimeRecent.episode_number = e.number
            AnimeRecent.episode = "/anime/animelatinohd/" + e.anime.slug + "/episode/" + e.number
            AnimeRecentEpisodesObjInfo.releases.push(AnimeRecent);
        })
      
        res.status(200).send(AnimeRecentEpisodesObjInfo);
    } catch (error) {
        return false;
    }

}
export default animelatinohdFunctions

