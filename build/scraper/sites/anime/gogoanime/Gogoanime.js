"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gogoanime = void 0;
const tslib_1 = require("tslib");
class Gogoanime {
    getAnimeInfo(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return getInfo(name);
        });
    }
    filter(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return getFilter(filter);
        });
    }
    getEpisodeServers(episode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return getEpisodeServers(episode);
        });
    }
}
exports.Gogoanime = Gogoanime;
//# sourceMappingURL=Gogoanime.js.map