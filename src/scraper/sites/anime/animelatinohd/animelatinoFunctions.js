import * as cheerio from "cheerio";
import axios from "axios";

import { GetAnimeInfo,GetAnimeEpisodeList,GetAnimeEpisode,GetAnimeServers,SearchArray,AnimeSearch } from "../../../../utils/shemaProvidersExperimental.js";
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

        AnimeInfo.title = animeInfoParseObj.name
        AnimeInfo.alternative_title.push(...animeInfoParseObj.name_alternative.split(","))
        AnimeInfo.synopsis[0].description = animeInfoParseObj.overview
        AnimeInfo.synopsis[0].keywords.push(...animeInfoParseObj.genres.split(","))
        AnimeInfo.synopsis[0].status = animeInfoParseObj.status == 1 ? "En emisión" : "Finalizado" 
        AnimeInfo.image = "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.poster + "?&w=53&q=95"
        AnimeInfo.type = animeInfoParseObj.type
        AnimeInfo.synopsis[0].premiere = animeInfoParseObj.aired

        //AnimeInfo.self = animeInfoParseObj.slug
   
        //AnimeInfo.banner = "https://www.themoviedb.org/t/p/original" +  animeInfoParseObj.banner + "?&w=280&q=95"

        animeInfoParseObj.episodes.map(e => {
            EpisodeInfo.episode_title = animeInfoParseObj.name
            EpisodeInfo.episode_number = e.number + ""
            EpisodeInfo.episode_image = "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.banner + "?&w=280&q=95"
            EpisodeInfo.episode_link = animeInfoUrl + "/episode/" + e.number;

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
                let Server = new GetAnimeServers()
               
                let ServerObj = {
                    lang_id: String(),
                    lang_name: String(),
                }

                ServerObj.lang_id = e.languaje
                ServerObj.lang_name = t

                Server.optional.push(ServerObj)

                Server.name = e.server.title
                Server.url = "https://api.animelatinohd.com/stream/" + e.id
              

                AnimeEpisodeInfo.servers.push(Server)
            })
        })

        res.status(200).send(AnimeEpisodeInfo)
    } catch (error) {
        return false;
    }
}

animelatinohdfunctions.animeSearch = async (req, res) => {

    let { search } = req.params

    try {
        const { data } = await axios.get(`${url}/animes?search=${search}`);
        const $ = cheerio.load(data);
        let animeSearchParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data


        const animeSearch = new SearchArray();
        const animeSearchData = new AnimeSearch();
        animeSearch.page = animeSearchParseObj.current_page
        animeSearchParseObj.data.map(e => {
            animeSearchData.anime_title = e.name
            animeSearchData.anime_image = "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95"
            animeSearchData.anime_link = "/anime/animelatinohd/" + e.slug
            animeSearchData.type = ""
            animeSearch.data.push(animeSearchData)
        })
        res.status(200).send(animeSearch);
    } catch (error) {
        return false;
    }

}

export default animelatinohdfunctions

