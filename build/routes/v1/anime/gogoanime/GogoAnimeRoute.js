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
var express_1 = require("express");
var Gogoanime_1 = require("../../../../scraper/sites/anime/gogoanime/Gogoanime");
var r = (0, express_1.Router)();
//anime info
r.get("/anime/gogoanime/name/:name", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, gogo, animeInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.params.name;
                gogo = new Gogoanime_1.GogoanimeInfo();
                return [4 /*yield*/, gogo.getAnimeInfo(name_1)];
            case 1:
                animeInfo = _a.sent();
                res.send({
                    data: [{ animeInfo: animeInfo }],
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//episode servers
r.get("/anime/gogoanime/episode/:name/:episode", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, episode, gogo, animeInfo, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.params, name_2 = _a.name, episode = _a.episode;
                gogo = new Gogoanime_1.GogoanimeServer();
                return [4 /*yield*/, gogo.getAnimeServerEpisode(name_2, episode)];
            case 1:
                animeInfo = _b.sent();
                res.send({
                    data: [{ animeInfo: animeInfo }],
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).send(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//filter
r.get("/anime/gogoanime/filter", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gen, season, year, gogo, animeInfo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                gen = req.query.gen;
                season = req.query.season;
                year = req.query.year;
                gogo = new Gogoanime_1.GogoanimeFilter();
                animeInfo = void 0;
                if (!gen) return [3 /*break*/, 2];
                return [4 /*yield*/, gogo.getAnimesfilterByGenre(gen)];
            case 1:
                animeInfo = _a.sent();
                return [3 /*break*/, 5];
            case 2:
                if (!(season && year)) return [3 /*break*/, 4];
                return [4 /*yield*/, gogo.filterBySeasons(season, year)];
            case 3:
                animeInfo = _a.sent();
                return [3 /*break*/, 5];
            case 4: throw new Error("Missing parameters");
            case 5:
                res.send({
                    data: [{ animeInfo: animeInfo }],
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).send(error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = r;
//# sourceMappingURL=GogoAnimeRoute.js.map