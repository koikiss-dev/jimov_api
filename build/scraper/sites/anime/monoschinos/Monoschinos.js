"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoschinos = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio = __importStar(require("cheerio"));
var utils_1 = require("../../../../types/utils");
var types = __importStar(require("../../../../types/."));
var search_1 = require("../../../../types/search");
var PageInfo = {
    name: 'monoschinos',
    url: 'https://monoschinos2.com',
    server: 'monoschinos2',
    domain: 'monoschinos2.com'
};
/**
 * This function returns a list of servers where the episode is located.
 * The URLs of the servers are Base64 encoded.
 *
 * @param url
 * @returns
 */
function getEpisodeServers(url) {
    return __awaiter(this, void 0, void 0, function () {
        var servers, $, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    servers = [];
                    _b = (_a = cheerio).load;
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    $ = _b.apply(_a, [(_c.sent()).data]);
                    $('div.playother').children().each(function (_i, element) {
                        servers.push(new types.EpisodeServer($(element).text().trim(), Buffer.from($(element).attr('data-player'), 'base64').toString('binary')));
                    });
                    return [2 /*return*/, servers];
            }
        });
    });
}
/**
 *
 * @param $
 * @param element
 * @returns
 */
function getEpisodeByElement($, element) {
    return __awaiter(this, void 0, void 0, function () {
        var episode;
        return __generator(this, function (_a) {
            episode = new types.Episode();
            episode.number = parseInt($(element).find('div.positioning p').text().trim());
            episode.image = $(element).find('div.animeimgdiv img.animeimghv').attr('data-src');
            episode.name = $(element).find('h2.animetitles').text().trim();
            episode.url = utils_1.api.getEpisodeURL(PageInfo, $(element).find('a').attr('href'));
            return [2 /*return*/, episode];
        });
    });
}
/**
 *
 * @throws {Error}
 * @returns
 */
function getLastEpisodes() {
    return __awaiter(this, void 0, void 0, function () {
        var episodes, $, _a, _b, elements, i, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    episodes = [];
                    _b = (_a = cheerio).load;
                    return [4 /*yield*/, axios_1.default.get(PageInfo.url)];
                case 1:
                    $ = _b.apply(_a, [(_e.sent()).data]);
                    elements = $('div.heroarea div.heroarea1 div.row').children();
                    i = 0;
                    _e.label = 2;
                case 2:
                    if (!(i < elements.length)) return [3 /*break*/, 5];
                    if (!($(elements[i]).children().length != 0)) return [3 /*break*/, 4];
                    _d = (_c = episodes).push;
                    return [4 /*yield*/, getEpisodeByElement($, elements[i])];
                case 3:
                    _d.apply(_c, [_e.sent()]);
                    _e.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, episodes];
            }
        });
    });
}
/**
 *
 * @param $
 * @returns
 */
function getGenres($) {
    var genres = [];
    $('div.chapterdetls2 table tbody a').each(function (_i, element) {
        genres.push($(element).text().trim());
    });
    return genres;
}
/**
 *
 * @param $
 * @returns
 */
function getAnimeEpisodes($) {
    var episodes = [];
    $('div.heromain2 div.allanimes div.row').children().each(function (_i, element) {
        var episode = new types.Episode();
        episode.number = parseInt($(element).attr('data-episode').trim());
        episode.image = $(element).find('img.animeimghv').attr('data-src');
        episode.name = $(element).find('img.animeimghv').attr('alt');
        episode.url = utils_1.api.getEpisodeURL(PageInfo, $(element).find('a').attr('href'));
        episodes.push(episode);
    });
    return episodes;
}
var calendar = [
    [['enero', 'febrero', 'marzo'], 'invierno'],
    [['abril', 'mayo', 'junio'], 'primavera'],
    [['julio', 'agosto', 'septiembre'], 'verano'],
    [['octubre', 'noviembre', 'diciembre'], 'otoño'],
];
/**
 * The calendar of the anime is extracted. The format shown on the
 * website is 'dd from mm from yyyy'.
 *
 * @param element
 * @returns the calendar of anime
 */
function getAnimeCalendar(element) {
    var date = element.find('ol.breadcrumb li.breadcrumb-item').text().trim().split(' ');
    if (date.length != 5)
        return { year: 0, station: null };
    else {
        for (var i = 0; i < calendar.length; i++) {
            if (calendar[i][0].includes(date[2].toLowerCase())) {
                return { year: parseInt(date.pop()), station: calendar[i][1].toString() };
            }
        }
    }
}
/**
 *
 * @param url
 * @returns
 */
function getAnime(url) {
    return __awaiter(this, void 0, void 0, function () {
        var $, _a, _b, calendar, anime;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = cheerio).load;
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    $ = _b.apply(_a, [(_c.sent()).data]);
                    calendar = getAnimeCalendar($($('div.chapterdetails nav').children()[1]));
                    anime = new types.Anime();
                    anime.name = $('div.chapterdetails').find('h1').text();
                    anime.alt_name = $('div.chapterdetails').find('span.alterno').text();
                    anime.url = utils_1.api.getAnimeURL(PageInfo, url);
                    anime.synopsis = $('div.chapterdetls2 p').text().trim();
                    anime.genres = getGenres($);
                    anime.image = new types.Image($('div.chapterpic img').attr('src'), $('div.herobg img').attr('src'));
                    anime.status = 'estreno' === $('div.butns button.btn1').text().toLowerCase().trim();
                    anime.episodes = getAnimeEpisodes($);
                    anime.date = new types.Calendar(calendar.year);
                    anime.station = calendar.station;
                    return [2 /*return*/, anime];
            }
        });
    });
}
/**
 *
 * @throws {Error}
 * @param url
 * @returns
 */
function getLastAnimes(url) {
    return __awaiter(this, void 0, void 0, function () {
        var animes, $, _a, _b, elements, i, href, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    animes = [];
                    _b = (_a = cheerio).load;
                    return [4 /*yield*/, axios_1.default.get(url !== null && url !== void 0 ? url : "".concat(PageInfo.url, "/emision"))];
                case 1:
                    $ = _b.apply(_a, [(_e.sent()).data]);
                    elements = $('div.heroarea div.heromain div.row').children();
                    i = 0;
                    _e.label = 2;
                case 2:
                    if (!(i < elements.length)) return [3 /*break*/, 5];
                    href = $(elements[i]).find('a').attr('href');
                    if (!(utils_1.utils.isUsableValue(href) && href !== 'https://monoschinos2.com/emision?p=2')) return [3 /*break*/, 4];
                    _d = (_c = animes).push;
                    return [4 /*yield*/, getAnime(href)];
                case 3:
                    _d.apply(_c, [_e.sent()]);
                    _e.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, animes];
            }
        });
    });
}
//console.log(await getLastAnimes('https://monoschinos2.com/animes?categoria=anime&genero=accion&fecha=2023&letra=A'));
//console.log(await getLastAnimes())
/**
 *
 *
 * @author Zukaritasu
 */
var Monoschinos = /** @class */ (function () {
    function Monoschinos() {
        this.getLastEpisodes = getLastEpisodes;
        this.getLastAnimes = getLastEpisodes;
        this.getEpisodeServers = getEpisodeServers;
        this.getAnime = getAnime;
    }
    Monoschinos.prototype.filter = function (category, genre, year, letter) {
        return __awaiter(this, void 0, void 0, function () {
            var animes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        animes = new search_1.ResultSearch();
                        return [4 /*yield*/, getLastAnimes("https://monoschinos2.com/animes?categoria=".concat(category !== null && category !== void 0 ? category : false, "&genero=").concat(genre !== null && genre !== void 0 ? genre : false, "&fecha=").concat(year !== null && year !== void 0 ? year : false, "&letra=").concat(letter !== null && letter !== void 0 ? letter : false))];
                    case 1:
                        (_a.sent())
                            .forEach(function (element) {
                            if (utils_1.utils.isUsableValue(element)) {
                                animes.results.push({ name: element.name, image: element.image.url,
                                    url: element.url, type: category
                                });
                            }
                        });
                        return [2 /*return*/, animes];
                }
            });
        });
    };
    return Monoschinos;
}());
exports.Monoschinos = Monoschinos;
;
//console.log(await getAnime("https://monoschinos2.com/anime/world-dai-star-sub-espanol"));
//# sourceMappingURL=Monoschinos.js.map