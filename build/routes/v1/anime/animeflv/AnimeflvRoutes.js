"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const AnimeFlv_1 = require("../../../../scraper/sites/anime/animeflv/AnimeFlv");
const r = (0, express_1.Router)();
//anime info
r.get("/anime/flv/name/:name", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const flv = new AnimeFlv_1.AnimeFlv();
        const animeInfo = yield flv.GetAnimeInfo(name);
        res.send({
            data: [{ animeInfo }],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
//episode servers
r.get("/anime/flv/episode/:episode", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { episode } = req.params;
        const flv = new AnimeFlv_1.AnimeFlv();
        const animeInfo = yield flv.GetEpisodeServers(episode);
        res.send({
            data: [{ animeInfo }],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
//filter
r.get("/anime/flv/filter", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const gen = req.query.gen;
        const date = req.query.date;
        const type = req.query.type;
        const status = req.query.status;
        const ord = req.query.ord;
        const page = req.query.page;
        const flv = new AnimeFlv_1.AnimeFlv();
        const animeInfo = yield flv.Filter(gen, date, type, status, ord, page);
        res.send({
            data: [{ animeInfo }],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.default = r;
//# sourceMappingURL=AnimeflvRoutes.js.map