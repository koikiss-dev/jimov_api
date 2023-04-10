"use strict";
/***********************************************************************
 *
 *
 *
 *
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = exports.EpisodeServer = void 0;
/**
 * @author Zukaritasu
 */
var EpisodeServer = /** @class */ (function () {
    function EpisodeServer(name, url) {
        this.name = name;
        this.url = url;
    }
    return EpisodeServer;
}());
exports.EpisodeServer = EpisodeServer;
var Episode = /** @class */ (function () {
    function Episode() {
        this.servers = [];
    }
    return Episode;
}());
exports.Episode = Episode;
//# sourceMappingURL=episode.js.map