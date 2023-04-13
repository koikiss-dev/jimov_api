"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.AnimeLatinoHD = void 0;
var cheerio = require("cheerio");
var axios_1 = require("axios");
var AnimeLatinoHD = /** @class */ (function () {
    function AnimeLatinoHD() {
        this.url = "https://www.animelatinohd.com";
        this.api = "https://api.animelatinohd.com";
    }
    AnimeLatinoHD.prototype.GetAnimeInfo = function (anime) {
        return __awaiter(this, void 0, void 0, function () {
            var data, $, animeInfoParseObj_1, AnimeInfo_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(this.url, "/anime/").concat(anime))];
                    case 1:
                        data = (_a.sent()).data;
                        $ = cheerio.load(data);
                        animeInfoParseObj_1 = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps.data;
                        AnimeInfo_1 = {
                            name: animeInfoParseObj_1.name,
                            url: "/anime/animelatinohd/name/".concat(anime),
                            synopsis: animeInfoParseObj_1.overview,
                            alt_name: __spreadArray([], animeInfoParseObj_1.name_alternative.split(","), true),
                            image: {
                                url: "https://www.themoviedb.org/t/p/original" + animeInfoParseObj_1.poster + "?&w=53&q=95"
                            },
                            genres: __spreadArray([], animeInfoParseObj_1.genres.split(","), true),
                            type: animeInfoParseObj_1.type,
                            status: animeInfoParseObj_1.status == 1 ? "En emisión" : "Finalizado",
                            date: animeInfoParseObj_1.aired,
                            episodes: []
                        };
                        //AnimeInfo.self = animeInfoParseObj.slug
                        //AnimeInfo.banner = "https://www.themoviedb.org/t/p/original" +  animeInfoParseObj.banner + "?&w=280&q=95"
                        animeInfoParseObj_1.episodes.map(function (e) {
                            var AnimeEpisode = {
                                name: animeInfoParseObj_1.name,
                                number: e.number + "",
                                image: "https://www.themoviedb.org/t/p/original" + animeInfoParseObj_1.banner + "?&w=280&q=95",
                                url: "/anime/animelatinohd/episode/".concat(animeInfoParseObj_1.name.replace(" ", "-") + "-" + e.number)
                            };
                            AnimeInfo_1.episodes.push(AnimeEpisode);
                        });
                        return [2 /*return*/, AnimeInfo_1];
                    case 2:
                        error_1 = _a.sent();
                        console.log("An error occurred while getting the anime info");
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnimeLatinoHD.prototype.GetEpisodeServers = function (episode) {
        return __awaiter(this, void 0, void 0, function () {
            var number, anime, data, $_1, animeEpisodeParseObj_1, AnimeEpisodeInfo_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        number = episode.substring(episode.lastIndexOf("-") + 1);
                        anime = episode.substring(0, episode.lastIndexOf("-"));
                        return [4 /*yield*/, axios_1["default"].get("".concat(this.url, "/ver/").concat(anime, "/").concat(number))];
                    case 1:
                        data = (_a.sent()).data;
                        $_1 = cheerio.load(data);
                        console.log(this.url + number + anime);
                        animeEpisodeParseObj_1 = JSON.parse($_1("#__NEXT_DATA__").html()).props.pageProps.data;
                        AnimeEpisodeInfo_1 = {
                            name: animeEpisodeParseObj_1.anime.name,
                            url: "/anime/animelatinohd/episode/".concat(episode),
                            number: number,
                            image: "",
                            servers: []
                        };
                        /*animeEpisodeParseObj.anterior ? AnimeEpisodeInfo.episode_prev = animeEpisodeUrl + "/episode/" + animeEpisodeParseObj.anterior.number : AnimeEpisodeInfo.episode_prev = false
                        animeEpisodeParseObj.siguiente ? AnimeEpisodeInfo.episode_next = animeEpisodeUrl + "/episode/" + animeEpisodeParseObj.siguiente.number : AnimeEpisodeInfo.episode_next = false
            
                        AnimeEpisodeInfo.episode_list = animeEpisodeUrl*/
                        $_1("#languaje option").each(function (_i, el) {
                            var v = Number($_1(el).val());
                            //let t = $(el).text();
                            animeEpisodeParseObj_1.players[v].map(function (e) {
                                var Server = {
                                    name: e.server.title,
                                    url: "https://api.animelatinohd.com/stream/" + e.id
                                };
                                /*let ServerObj = {
                                    lang_id: String,
                                    lang_name: String,
                                }
            
                                ServerObj.lang_id = e.languaje
                                ServerObj.lang_name = t*/
                                AnimeEpisodeInfo_1.servers.push(Server);
                            });
                        });
                        return [2 /*return*/, AnimeEpisodeInfo_1];
                    case 2:
                        error_2 = _a.sent();
                        console.log("An error occurred while getting the episode servers", error_2);
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnimeLatinoHD.prototype.GetAnimeByFilter = function (search, type, page, year, genre) {
        return __awaiter(this, void 0, void 0, function () {
            var data, animeSearchParseObj, animeSearch_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("".concat(this.api, "/api/anime/list"), {
                                params: {
                                    search: search,
                                    type: type,
                                    year: year,
                                    genre: genre,
                                    page: page
                                }
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        animeSearchParseObj = data;
                        animeSearch_1 = {
                            nav: {
                                count: animeSearchParseObj.data.length,
                                current: animeSearchParseObj.current_page,
                                next: animeSearchParseObj.data.length < 28 ? 0 : animeSearchParseObj.current_page + 1,
                                hasNext: animeSearchParseObj.data.length < 28 ? false : true
                            },
                            results: []
                        };
                        animeSearchParseObj.data.map(function (e) {
                            var animeSearchData = {
                                name: e.name,
                                image: "https://www.themoviedb.org/t/p/original" + e.poster + "?&w=53&q=95",
                                url: "/anime/animelatinohd/name/".concat(e.slug),
                                type: ""
                            };
                            animeSearch_1.results.push(animeSearchData);
                        });
                        return [2 /*return*/, animeSearch_1];
                    case 2:
                        error_3 = _a.sent();
                        console.log("An error occurred while getting the episode servers", error_3);
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnimeLatinoHD;
}());
exports.AnimeLatinoHD = AnimeLatinoHD;
