"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const AnimeLatinoHD_1 = require("../../../../scraper/sites/anime/animelatinohd/AnimeLatinoHD");
const Anime = new AnimeLatinoHD_1.AnimeLatinoHD();
const router = (0, express_1.Router)();
// Filter
router.get("/anime/animelatinohd/filter", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let { search, type, page, year, genre } = req.query;
    let data = yield Anime.GetAnimeByFilter(search, type, page, year, genre);
    res.send(data);
}));
// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/name/:name", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.params;
    let data = yield Anime.GetAnimeInfo(name);
    res.send(data);
}));
// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/episode/:episode", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let { episode } = req.params;
    let data = yield Anime.GetEpisodeServers(episode);
    res.send(data);
}));
router.get("/anime/animelatinohd/episode/:episode", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let { episode } = req.params;
    let data = yield Anime.GetEpisodeServers(episode);
    res.send(data);
}));
exports.default = router;
//# sourceMappingURL=AnimeLatinoHDRoutes.js.map