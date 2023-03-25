"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeFlv = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const anime_1 = require("../../../../types/anime");
const episode_1 = require("../../../../types/episode");
const search_1 = require("../../../../types/search");
class AnimeFlv {
    constructor() {
        this.url = "https://www2.animeflv.bz";
    }
    GetAnimeInfo(anime) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.url}/anime/${anime}`);
                const $ = (0, cheerio_1.load)(data);
                const title = $("h2.Title").text().trim();
                const title_alt = $("span.TxtAlt").text().trim();
                const img = $("div.AnimeCover .Image figure img").attr("src");
                const status = $("p.AnmStts span").text().trim();
                const synopsis = $("div.Description").text().trim();
                const episodes = $(".ListCaps li a");
                const AnimeReturn = new anime_1.Anime();
                AnimeReturn.name = title;
                AnimeReturn.alt_name = [...title_alt.split(",")];
                AnimeReturn.image = {
                    url: img,
                };
                AnimeReturn.status = status;
                AnimeReturn.synopsis = synopsis;
                AnimeReturn.chronology = [];
                //getRelated
                $("ul.ListAnmRel li a").each((_i, e) => {
                    const cro = new anime_1.Chronology();
                    cro.name = $(e).text().trim();
                    cro.url = `/anime/flv/name/${$(e)
                        .attr("href")
                        .replace("/anime", "anime/flv")}`;
                    AnimeReturn.chronology.push(cro);
                });
                //get genres
                $("nav.Nvgnrs a").each((_i, e) => {
                    const gen = $(e).text().trim();
                    AnimeReturn.genres.push(gen);
                });
                //get episodes
                episodes.each((_i_, e) => {
                    const l = $(e).attr("href").replace("/", "");
                    const episode = new episode_1.Episode();
                    episode.name = $(e).children(".Title").text().trim();
                    episode.url = `/anime/flv/episode/${`${l}`.replace("/anime", "/anime/flv")}`;
                    episode.number = $(e).children("p").last().text().trim();
                    episode.image = $(e).children("figure").find(".lazy").attr("src");
                    AnimeReturn.episodes.push(episode);
                });
                return AnimeReturn;
            }
            catch (error) {
                console.log("An error occurred while getting the anime info", error);
                throw new Error("An error occurred while getting the anime info");
            }
        });
    }
    Filter(gen, date, type, status, ord, page) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.url}/browse`, {
                    params: {
                        genres: gen || "all",
                        year: date || "all",
                        status: status || "all",
                        Tipo: type || "all",
                        order: ord || 1,
                        page: page || 1,
                    },
                });
                const $ = (0, cheerio_1.load)(data);
                const info = $("ul.ListAnimes li article.Anime div.Description");
                const data_filter = new search_1.ResultSearch();
                data_filter.results = [];
                info.each((_i, e) => {
                    const info = new search_1.AnimeSearch();
                    info.name = $(e).find(".Title").last().text().trim();
                    info.image = $("figure").children("img").attr("src");
                    info.url = `/anime/flv/name/${$(e)
                        .find("a")
                        .attr("href")
                        .replace("/anime/", "")}`;
                    info.type = $(e).find("p").children("span.Type").text().trim();
                    data_filter.results.push(info);
                });
                return data_filter;
            }
            catch (error) {
                console.log("An error occurred while getting the filter values", error);
                throw new Error("An error occurred while getting the filter values");
            }
        });
    }
    GetEpisodeServers(episode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.url}/${episode}`);
                const $ = (0, cheerio_1.load)(data);
                const title = $(".CapiTop").children("h1").text().trim();
                const getLinks = $(".CpCnA .anime_muti_link li");
                const numberEpisode = episode.match(/\d+/g);
                const episodeReturn = new episode_1.Episode();
                episodeReturn.name = title;
                episodeReturn.url = `/anime/flv/episode/${episode}`;
                episodeReturn.number = numberEpisode;
                episodeReturn.servers = [];
                getLinks.each((_i, e) => {
                    const servers = new episode_1.EpisodeServer();
                    servers.name = $(e).attr("title");
                    servers.url = $(e).attr("data-video");
                    episodeReturn.servers.push(servers);
                });
                return episodeReturn;
            }
            catch (error) {
                console.log("An error occurred while getting the episode servers", error);
                throw new Error("An error occurred while getting the episode servers");
            }
        });
    }
}
exports.AnimeFlv = AnimeFlv;
//# sourceMappingURL=AnimeFlv.js.map