"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeLatinoHD = void 0;
const tslib_1 = require("tslib");
const cheerio = tslib_1.__importStar(require("cheerio"));
const axios_1 = tslib_1.__importDefault(require("axios"));
class AnimeLatinoHD {
    constructor() {
        this.url = "https://www.animelatinohd.com";
        this.api = "https://api.animelatinohd.com";
    }
    GetAnimeInfo(anime) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.url}/anime/${anime}`);
                const $ = cheerio.load(data);
                let animeInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data;
                const AnimeInfo = {
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
                    date: animeInfoParseObj.aired,
                    episodes: []
                };
                //AnimeInfo.self = animeInfoParseObj.slug
                //AnimeInfo.banner = "https://www.themoviedb.org/t/p/original" +  animeInfoParseObj.banner + "?&w=280&q=95"
                animeInfoParseObj.episodes.map(e => {
                    let AnimeEpisode = {
                        name: animeInfoParseObj.name,
                        number: e.number + "",
                        image: "https://www.themoviedb.org/t/p/original" + animeInfoParseObj.banner + "?&w=280&q=95",
                        url: `/anime/animelatinohd/episode/${animeInfoParseObj.name.replace(" ", "-") + "-" + e.number}`
                    };
                    AnimeInfo.episodes.push(AnimeEpisode);
                });
                return AnimeInfo;
            }
            catch (error) {
                console.log("An error occurred while getting the anime info");
                return {};
            }
        });
    }
    GetEpisodeServers(episode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let number = episode.substring(episode.lastIndexOf("-") + 1);
                let anime = episode.substring(0, episode.lastIndexOf("-"));
                const { data } = yield axios_1.default.get(`${this.url}/ver/${anime}/${number}`);
                const $ = cheerio.load(data);
                console.log(this.url + number + anime);
                let animeEpisodeParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data;
                const AnimeEpisodeInfo = {
                    name: animeEpisodeParseObj.anime.name,
                    url: `/anime/animelatinohd/episode/${episode}`,
                    number: number,
                    image: "",
                    servers: []
                };
                /*animeEpisodeParseObj.anterior ? AnimeEpisodeInfo.episode_prev = animeEpisodeUrl + "/episode/" + animeEpisodeParseObj.anterior.number : AnimeEpisodeInfo.episode_prev = false
                animeEpisodeParseObj.siguiente ? AnimeEpisodeInfo.episode_next = animeEpisodeUrl + "/episode/" + animeEpisodeParseObj.siguiente.number : AnimeEpisodeInfo.episode_next = false
    
                AnimeEpisodeInfo.episode_list = animeEpisodeUrl*/
                $("#languaje option").each((_i, el) => {
                    let v = Number($(el).val());
                    //let t = $(el).text();
                    animeEpisodeParseObj.players[v].map(e => {
                        let Server = {
                            name: e.server.title,
                            url: "https://api.animelatinohd.com/stream/" + e.id,
                        };
                        /*let ServerObj = {
                            lang_id: String,
                            lang_name: String,
                        }
    
                        ServerObj.lang_id = e.languaje
                        ServerObj.lang_name = t*/
                        AnimeEpisodeInfo.servers.push(Server);
                    });
                });
                return AnimeEpisodeInfo;
            }
            catch (error) {
                console.log("An error occurred while getting the episode servers", error);
                return {};
            }
        });
    }
    GetAnimeByFilter(search, type, page, year, genre) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.api}/api/anime/list`, {
                    params: {
                        search: search,
                        type: type,
                        year: year,
                        genre: genre,
                        page: page
                    }
                });
                let animeSearchParseObj = data;
                const animeSearch = {
                    nav: {
                        count: animeSearchParseObj.data.length,
                        current: animeSearchParseObj.current_page,
                        next: animeSearchParseObj.data.length < 28 ? 0 : animeSearchParseObj.current_page + 1,
                        hasNext: animeSearchParseObj.data.length < 28 ? false : true
                    },
                    results: []
                };
                animeSearchParseObj.data.map(e => {
                    const animeSearchData = {
                        name: e.name,
                        image: "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95",
                        url: `/anime/animelatinohd/name/${e.slug}`,
                        type: ""
                    };
                    animeSearch.results.push(animeSearchData);
                });
                return animeSearch;
            }
            catch (error) {
                console.log("An error occurred while getting the episode servers", error);
                return {};
            }
        });
    }
}
exports.AnimeLatinoHD = AnimeLatinoHD;
//# sourceMappingURL=AnimeLatinoHD.js.map