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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeFlv = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = require("cheerio");
var anime_1 = require("../../../../types/anime");
var episode_1 = require("../../../../types/episode");
var search_1 = require("../../../../types/search");
var AnimeFlv = /** @class */ (function () {
    function AnimeFlv() {
        this.url = "https://www2.animeflv.bz";
    }
    AnimeFlv.prototype.GetAnimeInfo = function (anime) {
        return __awaiter(this, void 0, void 0, function () {
            var data, $_1, title, title_alt, img, status_1, synopsis, episodes, AnimeReturn_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.url, "/anime/").concat(anime))];
                    case 1:
                        data = (_a.sent()).data;
                        $_1 = (0, cheerio_1.load)(data);
                        title = $_1("h2.Title").text().trim();
                        title_alt = $_1("span.TxtAlt").text().trim();
                        img = $_1("div.AnimeCover .Image figure img").attr("src");
                        status_1 = $_1("p.AnmStts span").text().trim();
                        synopsis = $_1("div.Description").text().trim();
                        episodes = $_1(".ListCaps li a");
                        AnimeReturn_1 = new anime_1.Anime();
                        AnimeReturn_1.name = title;
                        AnimeReturn_1.alt_name = __spreadArray([], title_alt.split(","), true);
                        AnimeReturn_1.image = {
                            url: img,
                        };
                        AnimeReturn_1.status = status_1;
                        AnimeReturn_1.synopsis = synopsis;
                        AnimeReturn_1.chronology = [];
                        //getRelated
                        $_1("ul.ListAnmRel li a").each(function (_i, e) {
                            var cro = new anime_1.Chronology();
                            cro.name = $_1(e).text().trim();
                            cro.url = "/anime/flv/name/".concat($_1(e)
                                .attr("href")
                                .replace("/anime/", ""));
                            AnimeReturn_1.chronology.push(cro);
                        });
                        //get genres
                        $_1("nav.Nvgnrs a").each(function (_i, e) {
                            var gen = $_1(e).text().trim();
                            AnimeReturn_1.genres.push(gen);
                        });
                        //get episodes
                        episodes.each(function (_i_, e) {
                            var l = $_1(e).attr("href").replace("/", "");
                            var episode = new episode_1.Episode();
                            episode.name = $_1(e).children(".Title").text().trim();
                            episode.url = "/anime/flv/episode/".concat("".concat(l).replace("/anime", "/anime/flv"));
                            episode.number = $_1(e).children("p").last().text().trim();
                            episode.image = $_1(e).children("figure").find(".lazy").attr("src");
                            AnimeReturn_1.episodes.push(episode);
                        });
                        return [2 /*return*/, AnimeReturn_1];
                    case 2:
                        error_1 = _a.sent();
                        console.log("An error occurred while getting the anime info", error_1);
                        throw new Error("An error occurred while getting the anime info");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnimeFlv.prototype.Filter = function (gen, date, type, status, ord, page) {
        return __awaiter(this, void 0, void 0, function () {
            var data, $_2, info, data_filter_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.url, "/browse"), {
                                params: {
                                    genres: gen || "all",
                                    year: date || "all",
                                    status: status || "all",
                                    Tipo: type || "all",
                                    order: ord || 1,
                                    page: page || 1,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        $_2 = (0, cheerio_1.load)(data);
                        info = $_2("ul.ListAnimes li article.Anime div.Description");
                        data_filter_1 = new search_1.ResultSearch();
                        data_filter_1.results = [];
                        info.each(function (_i, e) {
                            var info = new search_1.AnimeSearch();
                            info.name = $_2(e).find(".Title").last().text().trim();
                            info.image = $_2("figure").children("img").attr("src");
                            info.url = "/anime/flv/name/".concat($_2(e)
                                .find("a")
                                .attr("href")
                                .replace("/anime/", ""));
                            info.type = $_2(e).find("p").children("span.Type").text().trim();
                            data_filter_1.results.push(info);
                        });
                        return [2 /*return*/, data_filter_1];
                    case 2:
                        error_2 = _a.sent();
                        console.log("An error occurred while getting the filter values", error_2);
                        throw new Error("An error occurred while getting the filter values");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnimeFlv.prototype.GetEpisodeServers = function (episode) {
        return __awaiter(this, void 0, void 0, function () {
            var data, $_3, title, getLinks, numberEpisode, episodeReturn_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.url, "/").concat(episode))];
                    case 1:
                        data = (_a.sent()).data;
                        $_3 = (0, cheerio_1.load)(data);
                        title = $_3(".CapiTop").children("h1").text().trim();
                        getLinks = $_3(".CpCnA .anime_muti_link li");
                        numberEpisode = episode.match(/\d+/g);
                        episodeReturn_1 = new episode_1.Episode();
                        episodeReturn_1.name = title;
                        episodeReturn_1.url = "/anime/flv/episode/".concat(episode);
                        episodeReturn_1.number = numberEpisode;
                        episodeReturn_1.servers = [];
                        getLinks.each(function (_i, e) {
                            var servers = new episode_1.EpisodeServer();
                            servers.name = $_3(e).attr("title");
                            servers.url = $_3(e).attr("data-video");
                            episodeReturn_1.servers.push(servers);
                        });
                        return [2 /*return*/, episodeReturn_1];
                    case 2:
                        error_3 = _a.sent();
                        console.log("An error occurred while getting the episode servers", error_3);
                        throw new Error("An error occurred while getting the episode servers");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnimeFlv;
}());
exports.AnimeFlv = AnimeFlv;
//# sourceMappingURL=AnimeFlv.js.map