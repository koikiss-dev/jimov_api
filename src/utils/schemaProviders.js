//anime data return standard

//spanish providers
/*search*/
export class AnimeSearch {
  /**
   *
   * @param {*} anime_title
   * @param {*} anime_image
   * @param {*} link_anime
   * @param {*} type
   * @param {*} current_page
   */
  constructor(anime_title, anime_image, link_anime, type, current_page) {
    this.anime_title = anime_title;
    this.anime_image = anime_image;
    this.link_anime = link_anime;
    this.type = type;
    this.current_page = current_page;
  }
}
export class SearchArray {
  constructor() {
    this.data = new Array();
  }
}
/*search*/

/*Anime info*/
export class EpisodeListShema {
  /**
   * @param {*} episode_title String()
   * @param {*} episode_number String()
   * @param {*} image_espisode String()
   * @param {*} link_episode String()
   */
  constructor(episode_title, episode_number, image_espisode, link_episode) {
    this.episode_title = episode_title;
    this.episode_number = episode_number;
    this.image_espisode = image_espisode;
    this.link_episode = link_episode;
  }
}
export class Cronology {
  /**
   *
   * @param {*} anime_title
   * @param {*} link
   */
  constructor(anime_title, link) {
    this.anime_title = anime_title;
    this.link_anime = link;
  }
}
export class GetAnimeInfo {
  /**
   *
   * @param {*} anime_title String()
   * @param {*} alternative_title String()
   * @param {*} description String()
   * @param {*} keywords new Array()
   * @param {*} status String()
   * @param {*} type String()
   * @param {*} anime_image String()
   * @param {*} premiere String()
   * @author yako
   * @description please use: episode_title: String(), episode_number: String(), image_espisode: String(), link_episode: String()
   */
  constructor(type = null, anime_image = null, premiere = null) {
    this.anime_title = String();
    this.alternative_title = new Array();
    this.type = type;
    this.anime_image = new String();
    this.synopsis = [
      {
        description: String(),
        keywords: new Array(),
        status: String(),
        premiere: premiere,
        chronology: [],
      },
    ];
    this.episode_list = new Array();
  }
}
/*Anime info*/

/*anime servers*/
export class EpisodeServer {
  /**
   *
   * @param {*} name
   * @param {*} url
   */
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}
export class GetAnimeServers {
  constructor() {
    this.servers = new Array();
  }
}

/*anime servers*/
