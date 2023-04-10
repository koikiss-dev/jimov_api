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
exports.utils = exports.api = void 0;
//================== API functions ==================
exports.api = {
    /**
     * Replaces the original URL with the API URL
     *
     * @param info
     * @param url
     * @returns
     */
    getEpisodeURL: function (info, url) {
        return url.replace("https://".concat(info.domain, "/ver/"), "/anime/".concat(info.name, "/episode/"));
    },
    /**
     * Replaces the original URL with the API URL
     *
     * @param info
     * @param url
     * @returns
     */
    getAnimeURL: function (info, url) {
        return url.replace("https://".concat(info.domain, "/anime/"), "/anime/".concat(info.name, "/name/"));
    }
};
//===================================================
exports.utils = {
    /**
     *
     * @param object
     * @returns
     */
    isUsableValue: function (object) {
        return object == null || object == undefined;
    }
};
//# sourceMappingURL=utils.js.map