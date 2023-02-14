// Experimental

//spanish providers

/* Search */

export class AnimeSearch {
    /**
     *
     * @param {*} anime_title
     * @param {*} anime_image
     * @param {*} link_anime
     * @param {*} type
     * @param {*} current_page
     */
    constructor(anime_title, anime_image, anime_link, type) {
        this.anime_title = anime_title;
        this.anime_image = anime_image;
        this.anime_link = anime_link;
        this.type = type;
    }
}
export class SearchArray {
    constructor(page) {
        this.data = new Array();
        this.page = page;
    }
}

/* Search */

/* Anime Info */

export class GetAnimeEpisodeList {
    /**
     * @param {*} episode_title String()
     * @param {*} episode_number String()
     * @param {*} episode_image String()
     * @param {*} episode_link String()
     */
    constructor(episode_title, episode_number, episode_image, episode_link) {
        this.episode_title = episode_title;
        this.episode_number = episode_number;
        this.episode_image = episode_image;
        this.episode_link = episode_link;
    }
}

export class GetAnimeInfo {
    /**
     * @param {*} anime_title String() 
     * @param {*} alternative_title String()
     * @param {*} description String()
     * @param {*} keywords new Array()
     * @param {*} status String() 
     * @param {*} link String() /anime/provider/ 
     * @param {*} episode_title String() 
     * @param {*} episode_number String()
     * @param {*} image_espisode String()
     * @param {*} type String()
     * @param {*} anime_image String()
     * @param {*} premiere String()
     * @author yako
     * @description please use: episode_title: String(), episode_number: String(), image_episode: String(), link_episode: String()
     */
    constructor(type = null, anime_image = null, premiere = null) {
        this.title = String();
        this.alternative_title = new Array();
        this.type = type;
        this.image = new String();
        this.synopsis = [
            {
                description: String(),
                keywords: new Array(),
                status: String(),
                premiere: premiere,
                chronology: [],
            },
        ];
        this.anime_similar = new Array();
        this.episode_list = new Array();
    }
}

/* Anime Info */

/* Anime Servers */

export class GetAnimeEpisode {
    /**
     * @param {*} title episode
     * @param {*} next episode
     * @param {*} previous episode
     * @param {*} list episode
     */
    constructor(episode_title,episode_next, episode_prev,episode_list) {
        this.episode_title = episode_title;
        this.episode_next = episode_next;
        this.episode_prev = episode_prev;
        this.episode_list = episode_list;
        this.servers = new Array();
    }
}

export class GetAnimeServers {
    /**
     * @param {*} name server
     * @param {*} url server
     * @param {*} optional is additional information from some providers
     */
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.optional = new Array();
    }
}

/* Anime Servers*/