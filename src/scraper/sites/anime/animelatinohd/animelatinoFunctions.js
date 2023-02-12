import * as cheerio from "cheerio";
import axios from "axios";

import { GetAnimeInfo,GetAnimeEpisodeList,GetAnimeEpisode } from "../../../../utils/shemaProvidersExperimental.js";
const animelatinohdfunctions = {}
const url = "https://www.animelatinohd.com"
const urlapi = "https://api.animelatinohd.com/api"

class AnimeEpisode {
    constructor() {
        this.title_episode = String();

        this.next_episode = String();
        this.prev_episode = String();
        this.list_episode = String();

        this.servers = new Array();
    }
}

animelatinohdfunctions.animeinfo = async (req, res) => {

    let { title } = req.params

    try {
        const { data } = await axios.get(`${url}/anime/${title}`);
        const $ = cheerio.load(data);
        const AnimeInfo = new GetAnimeInfo();
        const EpisodeInfo = new GetAnimeEpisodeList();
        let animeInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data
        let animeInfoUrl = "/anime/animelatinohd/" + animeInfoParseObj.slug


        // Status (0 == finalized,1 == on broadcast)
        // Type (1 == "Movie")
        AnimeInfo.anime_title = animeInfoParseObj.name
        AnimeInfo.alternative_title.push(...animeInfoParseObj.name_alternative.split(","))
        AnimeInfo.synopsis[0].description = animeInfoParseObj.overview
        AnimeInfo.synopsis[0].keywords.push(...animeInfoParseObj.genres.split(","))
        AnimeInfo.synopsis[0].status = animeInfoParseObj.status == 1 ? "En emisión" : "Finalizado" 
        AnimeInfo.anime_image = "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.poster + "?&w=53&q=95"
        AnimeInfo.type = animeInfoParseObj.type
        AnimeInfo.synopsis[0].premiere = animeInfoParseObj.aired

        //AnimeInfo.self = animeInfoParseObj.slug
   
        //AnimeInfo.banner = "https://www.themoviedb.org/t/p/original" +  animeInfoParseObj.banner + "?&w=280&q=95"

        animeInfoParseObj.episodes.map(e => {
            EpisodeInfo.episode_title = animeInfoParseObj.name
            EpisodeInfo.episode_number = e.number + ""
            EpisodeInfo.image_episode = "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.banner + "?&w=280&q=95"
            EpisodeInfo.link_episode = animeInfoUrl + "/episode/" + e.number;

            AnimeInfo.episode_list.push(EpisodeInfo);
        })

        res.status(200).send(AnimeInfo);
    } catch (error) {
        return false;
    }
}

animelatinohdfunctions.animeEpisodeinfo = async (req, res) => {
    let { title, episode } = req.params

    try {
        const { data } = await axios.get(`${url}/ver/${title}/${episode}`);
        const $ = cheerio.load(data);
        const AnimeEpisodeInfo = new GetAnimeEpisode();

        let animeEpisodeParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data
        let animeEpisodeUrl = "/anime/animelatinohd/" + animeEpisodeParseObj.anime.slug


        AnimeEpisodeInfo.episode_title = animeEpisodeParseObj.anime.name

        animeEpisodeParseObj.anterior ? AnimeEpisodeInfo.episode_prev = animeEpisodeUrl + "/episode/" + animeEpisodeParseObj.anterior.number : AnimeEpisodeInfo.episode_prev = false
        animeEpisodeParseObj.siguiente ? AnimeEpisodeInfo.episode_next = animeEpisodeUrl + "/episode/" + animeEpisodeParseObj.siguiente.number : AnimeEpisodeInfo.episode_next = false

        AnimeEpisodeInfo.episode_list = animeEpisodeUrl



        $("#languaje option").each((i, el) => {
            let v = $(el).val();
            let t = $(el).text();
            animeEpisodeParseObj.players[v].map(e => {
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

animelatinohdfunctions.animeRecentEpisodesinfo = async (req, res) => {
    try {
        const { data } = await axios.get(`${url}`);
        const $ = cheerio.load(data);
        const AnimeRecentEpisodesObjInfo = new Array();

        let ObjRelease = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.releases

        ObjRelease.map(e => {
            let AnimeRecent = {
                title: String(),
                self: String(),
                poster: String(),
                banner: String(),
                release: String(),
                anime_link: String(),
                episode_number: Number(),
                episode: String()
            }

            AnimeRecent.title = e.anime.name
            AnimeRecent.self = e.anime.slug
            AnimeRecent.poster = "https://www.themoviedb.org/t/p/original" + e.anime.poster + "?&w=53&q=95"
            AnimeRecent.banner = "https://www.themoviedb.org/t/p/original" + e.anime.banner + "?&w=280&q=95"
            AnimeRecent.release = e.created_at
            AnimeRecent.episode_number = e.number
            AnimeRecent.link = "/anime/animelatinohd/" + e.anime.slug
            AnimeRecent.episode = "/anime/animelatinohd/" + e.anime.slug + "/episode/" + e.number
            AnimeRecentEpisodesObjInfo.push(AnimeRecent);
        })

        res.status(200).send(AnimeRecentEpisodesObjInfo);
    } catch (error) {
        return false;
    }

}


animelatinohdfunctions.animeMostPopular = async (req, res) => {
    try {
        const { data } = await axios.get(`${url}/animes/populares`);
        const $ = cheerio.load(data);
        const AnimeMostPopularObjInfo = new Array();

        let ObjRelease = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data.popular_today

        ObjRelease.map(e => {
            let AnimeMostPopular = {
                title: String(),
                self: String(),
                poster: String(),
                anime_link: String(),
                release: String(),
            }

            AnimeMostPopular.title = e.name
            AnimeMostPopular.self = e.slug
            AnimeMostPopular.poster = "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95"
            AnimeMostPopular.anime_link = "/anime/animelatinohd/" + e.slug
            AnimeMostPopular.release = e.aired
            AnimeMostPopularObjInfo.push(AnimeMostPopular);
        })

        res.status(200).send(AnimeMostPopularObjInfo);
    } catch (error) {
        return false;
    }

}

animelatinohdfunctions.animeMostviewed = async (req, res) => {
    try {
        const { data } = await axios.get(`${url}/animes/mas-vistos`);
        const $ = cheerio.load(data);
        const AnimeMostviewedObjInfo = new Array();

        let ObjRelease = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data.being_watched

        ObjRelease.map(e => {
            let AnimeMostviewed = {
                title: String(),
                self: String(),
                poster: String(),
                anime_link: String(),
                release: String(),
            }

            AnimeMostviewed.title = e.name
            AnimeMostviewed.self = e.slug
            AnimeMostviewed.poster = "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95"
            AnimeMostviewed.anime_link = "/anime/animelatinohd/" + e.slug
            AnimeMostviewed.release = e.aired
            AnimeMostviewedObjInfo.push(AnimeMostviewed);
        })

        res.status(200).send(AnimeMostviewedObjInfo);
    } catch (error) {
        return false;
    }

}

animelatinohdfunctions.animeCalendar = async (req, res) => {
    try {
        const { data } = await axios.get(`${url}/animes/calendario`);
        const $ = cheerio.load(data);

        /**
         * Order broadcast(1 == Now, 2 == morning, 3 == Saturday, 4 == Sunday, 5 == Monday, 6 == Tuesday, 7 == Wednesday )
         */

        let ObjRelease = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.simulcast
        let ObjCast = [
            {
                broadcast: "1",
                broadcast_timeText: "Now",
                broadcast_list: Array()
            },
            {
                broadcast: "2",
                broadcast_timeText: "Morning",
                broadcast_list: Array()
            },
            {
                broadcast: "3",
                broadcast_timeText: "Saturday",
                broadcast_list: Array()
            },
            {
                broadcast: "4",
                broadcast_timeText: "Sunday",
                broadcast_list: Array()
            },
            {
                broadcast: "5",
                broadcast_timeText: "Monday",
                broadcast_list: Array()
            },
            {
                broadcast: "6",
                broadcast_timeText: "Tuesday",
                broadcast_list: Array()
            },
            {
                broadcast: "7",
                broadcast_timeText: "Wednesday",
                broadcast_list: Array()
            },
        ]

        ObjCast.map(e => {
            ObjRelease[e.broadcast].map(el => {
                let animeCalendarObj = {
                    title: String(),
                    self: String(),
                    banner: String(),
                    broadcast: String(),
                    lastEpisode: Number(),
                    anime_link: String(),
                    release: String(),
                }

                animeCalendarObj.title = el.name
                animeCalendarObj.self = el.slug
                animeCalendarObj.banner = "https://www.themoviedb.org/t/p/original" + el.banner + "?&w=280&q=95"
                animeCalendarObj.anime_link = "/anime/animelatinohd/" + el.slug
                animeCalendarObj.broadcast = el.broadcast
                animeCalendarObj.release = el.date
                animeCalendarObj.lastEpisode = el.lastEpisode

                e.broadcast_list.push(animeCalendarObj)
            })

        })

        res.status(200).send(ObjCast);
    } catch (error) {
        return false;
    }

}

animelatinohdfunctions.animeSearch = async (req, res) => {

    let { search } = req.params

    try {
        const { data } = await axios.get(`${urlapi}/anime/search?search=${search}`);
        const animeSearchParse = []

        data.map(e => {
            let animeSearchObj = {
                title: String(),
                self: String(),
                anime_link: String(),
                poster: String()
            }

            animeSearchObj.title = e.name
            animeSearchObj.self = e.slug
            animeSearchObj.anime_link = "/anime/animelatinohd/" + e.slug
            animeSearchObj.poster = "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95"

            animeSearchParse.push(animeSearchObj)
        })


        res.status(200).send(animeSearchParse);
    } catch (error) {
        return false;
    }

}

export default animelatinohdfunctions

