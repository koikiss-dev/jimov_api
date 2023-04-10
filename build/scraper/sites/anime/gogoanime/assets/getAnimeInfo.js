"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimeInfo = exports.getHTML = void 0;
const tslib_1 = require("tslib");
const cheerio_1 = require("cheerio");
const axios_1 = require("axios");
const anime_1 = require("@animetypes/anime");
function getHTML(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.get(`${url}`);
        const pageHTML = (0, cheerio_1.load)(data);
        return pageHTML;
    });
}
exports.getHTML = getHTML;
function getAnimeInfo(animeName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const $ = yield getHTML(`https://ww4.gogoanimes.org/category/${animeName}`);
        const anime = new anime_1.Anime;
        anime.name = $("div.anime_info_body_bg  h1").text();
        anime.image = {
            url: $("div.anime_info_body_bg ").find("img").attr("src")
        };
        $("div.anime_info_body_bg p.type a").each((iterator, elementHTML) => {
            console.log($(elementHTML).text());
        });
    });
}
exports.getAnimeInfo = getAnimeInfo;
//# sourceMappingURL=getAnimeInfo.js.map