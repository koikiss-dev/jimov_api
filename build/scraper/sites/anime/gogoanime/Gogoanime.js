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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GogoanimeServer = exports.GogoanimeFilter = exports.GogoanimeInfo = void 0;
var getHTML_1 = require("./assets/getHTML");
var anime_1 = require("../../../../types/anime");
var getAllAnimesHTML_1 = require("./assets/getAllAnimesHTML");
var episode_1 = require("../../../../types/episode");
var GogoanimeInfo = /** @class */ (function () {
    function GogoanimeInfo() {
    }
    GogoanimeInfo.prototype.getAnimeInfo = function (animeName) {
        return __awaiter(this, void 0, void 0, function () {
            var $_1, anime_2, getNumberEpisodes, index, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, getHTML_1.getHTML)("https://www3.gogoanimes.fi/category/".concat(animeName))];
                    case 1:
                        $_1 = _a.sent();
                        anime_2 = new anime_1.Anime;
                        anime_2.genres = [];
                        anime_2.name = $_1("div.anime_info_body_bg  h1").text();
                        anime_2.image = {
                            url: $_1("div.anime_info_body_bg ").find("img").attr("src")
                        };
                        anime_2.alt_name = $_1("div.anime_info_body_bg").
                            find("p").
                            last().
                            text().
                            replace("Other name: ", "").
                            trim();
                        $_1("div.anime_info_body_bg p.type a").each(function (iterator, elementHTML) {
                            if (iterator)
                                anime_2.genres.push($_1(elementHTML).html());
                        });
                        $_1('div.anime_info_body_bg p.type').each(function (index, element) {
                            //Skips for first p.type
                            if (index)
                                if (index == 1) {
                                    anime_2.synopsis = $_1(element).text().replace('Plot Summary: ', '').trim();
                                }
                            if (index == 4 && $_1(element).text().trim() != 'Status: ') {
                                anime_2.status = true;
                            }
                            if (index == 5) {
                                anime_2.alt_name = $_1(element).text().trim()
                                    .replace('Other name:', '')
                                    .replace(/\s/g, '');
                            }
                        });
                        getNumberEpisodes = $_1('#episode_page li').last().text().trim().split("-")[1];
                        getNumberEpisodes = parseInt(getNumberEpisodes);
                        for (index = 1; index <= getNumberEpisodes; index++) {
                            anime_2.episodes.push({
                                name: "".concat(animeName, "-cap-").concat(index),
                                url: "/anime/".concat(animeName, "/episode/").concat(index),
                                number: "".concat(index),
                                image: "That isn't image"
                            });
                        }
                        console.log(anime_2);
                        return [2 /*return*/, anime_2];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GogoanimeInfo;
}());
exports.GogoanimeInfo = GogoanimeInfo;
var GogoanimeFilter = /** @class */ (function () {
    function GogoanimeFilter() {
    }
    GogoanimeFilter.prototype.getAnimesfilterByGenre = function (genre) {
        return __awaiter(this, void 0, void 0, function () {
            var animesByGenre;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, getAllAnimesHTML_1.getAllAnimes)("https://www3.gogoanimes.fi/genre/".concat(genre))];
                    case 1:
                        animesByGenre = _a.sent();
                        console.log(animesByGenre);
                        return [2 /*return*/, animesByGenre];
                }
            });
        });
    };
    GogoanimeFilter.prototype.filterBySeasons = function (season, year) {
        return __awaiter(this, void 0, void 0, function () {
            var animes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, getAllAnimesHTML_1.getAllAnimes)("https://www3.gogoanimes.fi/sub-category/".concat(season, "-").concat(year, "-anime"))];
                    case 1:
                        animes = _a.sent();
                        return [2 /*return*/, animes];
                }
            });
        });
    };
    return GogoanimeFilter;
}());
exports.GogoanimeFilter = GogoanimeFilter;
var GogoanimeServer = /** @class */ (function () {
    function GogoanimeServer() {
    }
    GogoanimeServer.prototype.getAnimeServerEpisode = function (animeName, episodeNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var $, episode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, getHTML_1.getHTML)("https://www3.gogoanimes.fi/".concat(animeName, "-episode-").concat(episodeNumber))];
                    case 1:
                        $ = _a.sent();
                        episode = new episode_1.Episode();
                        episode.name = "This isn't name";
                        episode.servers = [];
                        $(".anime_muti_link ul li ").each(function (iterator, element) {
                            var servers = new episode_1.EpisodeServer();
                            if (iterator == 0 || iterator == 1) {
                                servers.name = $(element).find("a").text().
                                    replace(" this server", "").trim();
                                servers.url = "http:".concat($(element).find("a").attr("data-video"));
                                episode.servers.push(servers);
                            }
                            if (iterator > 2) {
                                servers.name = $(element).find("a").text().
                                    replace(" this server", "").trim();
                                servers.url = $(element).find("a").attr("data-video");
                                episode.servers.push(servers);
                            }
                        });
                        console.log(episode);
                        return [2 /*return*/, episode];
                }
            });
        });
    };
    return GogoanimeServer;
}());
exports.GogoanimeServer = GogoanimeServer;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new GogoanimeServer().getAnimeServerEpisode("bocchi-the-rock", 2)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=Gogoanime.js.map