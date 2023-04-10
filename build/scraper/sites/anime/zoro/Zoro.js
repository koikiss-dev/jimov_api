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
exports.Zoro = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = require("cheerio");
var anime_1 = require("../../../../types/anime");
//import { Episode, EpisodeServer } from "../../../../types/episode";
var Zoro = /** @class */ (function () {
    function Zoro() {
        this.url = "https://zoro.to";
        //filter
        //episode server
        /* async GetEpisodeServer(episode: string, ep: string): Promise<Episode> {
          try {
            const animename = episode.toLowerCase().replace(/\s/g, "-");
            const { data } = await axios.get(
              `${this.url}/ajax/v2/episode/servers?episodeId=${ep}`,
              {
                headers: {
                  "Accept-Encoding": "*r",
                  Referer: `https://zoro.to/watch/${animename}`,
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
              }
            );
            const $ = load(data.html);
            const episodeReturn = new Episode();
            episodeReturn.name = animename + "-" + ep;
            episodeReturn.url = `/anime/zoro/episode/${animename + "-" + ep}`;
            episodeReturn.servers = [];
            //const sources = await this.getServers(data.id);
            async function getServers(id: string) {
              const { data } = await axios.get(
                `${this.url}/ajax/v2/episode/sources?id=${id}`
              );
              return data;
            }
      
            $(
              "body > div.ps_-block.ps_-block-sub.servers-sub > div.ps__-list > div.item"
            ).each((_i, e) => {
              const servers = new EpisodeServer();
              servers.name = $(e).text().trim();
              servers.url = $(e).attr("data-video");
              const type = e.attribs["data-type"];
              const name = $(e).text().trim();
              const serverId = e.attribs["data-id"];
              const serverId2 = e.attribs["data-server-id"];
              const url = `/anime/zoro/iframe/${serverId}`;
              episodeReturn.name = episode;
            });
          } catch (error) {
            console.log("An error occurred while getting the episode servers", error);
            throw new Error("An error occurred while getting the episode servers");
          }
        }
        async getServers(id): Promise<any> {
          const { data } = await axios.get(
            `${this.url}/ajax/v2/episode/sources?id=${id}`
          );
          return data;
        } */
    }
    Zoro.prototype.getAnimeInfo = function (animeName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, $_1, anime_2, aniscInfo_1, additionalInfo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.url, "/").concat(animeName))];
                    case 1:
                        response = _a.sent();
                        $_1 = (0, cheerio_1.load)(response.data);
                        anime_2 = new anime_1.Anime();
                        aniscInfo_1 = [];
                        // get additional anime info
                        $_1("div.anisc-info div.item-title").each(function (_i, e) {
                            var dataSpan = $_1(e).children("span.name").text().trim();
                            var dataA = $_1(e).children("a.name").text().trim();
                            aniscInfo_1.push(dataSpan, dataA);
                        });
                        additionalInfo = aniscInfo_1.filter(function (el) { return el !== ""; });
                        // set anime properties
                        anime_2.name = $_1("h2.film-name").text().trim();
                        anime_2.alt_name = __spreadArray([], additionalInfo[0], true);
                        anime_2.url = "/anime/zoro/name/".concat(animeName);
                        anime_2.synopsis = $_1("div.film-description div.text").text().trim();
                        anime_2.image = { url: $_1("img.film-poster-img").attr("src") };
                        anime_2.genres = [];
                        anime_2.chronology = [];
                        // get anime genres
                        $_1("div.anisc-info div.item-list a").each(function (_i, e) {
                            var genre = $_1(e).text().trim();
                            anime_2.genres.push(genre);
                        });
                        // get anime chronology
                        $_1("div.anif-block-ul ul li").each(function (_i, e) {
                            var chronology = new anime_1.Chronology();
                            chronology.name = $_1(e).find("h3.film-name").children("a").text().trim();
                            chronology.url = "/anime/zoro/name/".concat($_1(e)
                                .find("h3.film-name")
                                .children("a")
                                .attr("href"));
                            anime_2.chronology.push(chronology);
                        });
                        return [2 /*return*/, anime_2];
                    case 2:
                        error_1 = _a.sent();
                        console.log("An error occurred while getting the anime info", error_1);
                        throw new Error("An error occurred while getting the anime info");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Zoro;
}());
exports.Zoro = Zoro;
//# sourceMappingURL=Zoro.js.map