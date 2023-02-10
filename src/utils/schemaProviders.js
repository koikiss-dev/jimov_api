//anime data return standard

//spanish providers
//search
export class AnimeSearch {
    /**
     * 
     * @param {*} anime_title String()
     * @param {*} anime_image String()
     * @param {*} link String() /anime/provider/
     * @param {*} type String()
     * @param {*} current_page String()
     * @author yako
     */
  constructor() {
    this.data = new Array();
  }
}
//Anime Info
export class GetAnimeInfo {
    /**
     * 
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

//anime servers
export class GetAnimeServers {
    /**
     * @param {*} server_name
     * @param {*} server_id
     * @description use server_name: String(), server_id: String()
     * @author yako
     */
  constructor() {
    this.servers = []
  }
}