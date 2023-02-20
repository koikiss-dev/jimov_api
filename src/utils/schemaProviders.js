//anime data return standard

//spanish providers

/**
 * The class contains the URLs of the cover image and banner of the
 * anime website
 * @author Zukaritasu
 * @see Episode
 * @see Anime
 */
export class Image {
  /**
   * The cover image of the anime (not to be confused with the banner),
   * the banner is horizontally oriented rectangular in diameter, while
   * the cover image is vertically oriented.
   * @type {string}
   */
  url;
  /**
   * The URL of the anime banner. Some websites may not use a banner
   * so this field may be null
   * @type {(string | null)}
   * @default null
   */
  banner = null;
  /**
   * @param {(string)} url image url
   * @param {(string | null)} banner banner url
   */
  constructor(url, banner) {
    this.url = url;
    this.banner = banner;
  }
}

/**************************************************************
 *                     EPISODE AND SERVERS                    *
 **************************************************************/

/**
 * Basic information of the server where the episode is hosted
 * @author Zukaritasu
 * @see Episode
 */
export class EpisodeServer {
  /**
   * The name of the server where the episode is hosted
   * @type {string}
   */
  name;
  /**
   * The URL of the chapter. Some anime pages contain the URL of the
   * episode encoded, it is up to the programmer to decode it.
   * @type {string}
   */
  url;
  /**
   * 
   * @param {string} name server name
   * @param {string} url server url
   */
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

/**
 * This class represents the structure containing the general information
 * of an anime episode. It can also represent a movie, ova or onas.
 * @author Zukaritasu
 * @see EpisodeServer
 * @see Anime
 */
export class Episode {
  /**
   * The name of the anime with its chapter number
   * @type {string}
   */
  name;
  /**
   * The URL of the episode. This field cannot be null or undefined
   * @type {string}
   */
  url;
  /**
   * Episode number. If it is a movie, the default value is 1
   * @type {number}
   * @default 1
   */
  number = 1;
  /**
   * Servers where the chapter is hosted to watch the anime online
   * @type {EpisodeServer[]}
   */
  servers = [];
  /**
   * The video thumbnail in the last chapters view
   * @type {string}
   */
  image;
  /**
   * This function returns the episode number. Generally the episode
   * number is at the end of the string, otherwise the function returns 0.
   * @param {string} name - The name or title of the chapter containing the
   * chapter number
   * @returns Episode number
   */
  static getEpisodeNumber(name) {
    if (typeof name === 'string') {
      for (let i = name.length - 1; i >= 0; i--) {
        if (name[i] === ' ') {
          return parseInt(name.substring(i, name.length).trim());
        }
      }
    }
    return 0;
  }
}

/**************************************************************
 *                     ANIME INFO                             *
 **************************************************************/

/**
 * Specifies the anime climatic station
 * @readonly
 * @enum {String}
 */
export const ClimaticStation = {
  Summer: Symbol('summer'),
  Autumn: Symbol('autumn'),
  Winter: Symbol('winter'),
  Spring: Symbol('spring'),
}

/**
 * Anime chronology
 * @author Zukaritasu
 * @see Anime
 */
export class Chronology {
  /**
   * The name of the anime
   * @type {string}
   */
  name;
  /**
   * The URL of the anime. It can also refer to movies, ovas and onas.
   * @type {string}
   */
  url;
  /**
   * The cover image of the anime
   * @type {string}
   */
  image;
  /**
   * @param {(string)} name the name of anime
   * @param {(string)} url anime url
   * @param {(string)} image banner or image of the chronological anime
   */
  constructor(name, url, image = null /* image url! */) {
    this.name = name;
    this.url = url;
    this.image = image;
  }
}

/**
 * General information about an anime. The class contains information
 * that can be found on any anime website.
 * @author Zukaritasu
 * @see Episode
 * @see Image
 * @see Chronology
 * @see ClimaticStation
 */
export class Anime {
  /**
   * The name of the anime
   * @type {string}
   */
  name;
  /**
   * The alternative name of the anime
   * @type {string}
   */
  alt_name = null;
  /**
   * The URL of the anime
   * @type {string}
   */
  alt_name = null;
  /**
   * The alternative name of the anime
   * @type {string}
   */
  url;
  /**
   * Anime synopsis
   * @type {string}
   */
  synopsis;
  /**
   * The cover and banner of the anime
   * @type {Image}
   */
  image;
  /**
   * The year the anime was released
   * @type {number}
   * @default 0
   */
  year = 0;
  /**
   * Defines whether the anime refers to a tv, movie, ova, or ona
   * @type {string}
   */
  type;
  /**
   * Anime genres. Genres are defined by a text string in English or
   * Spanish depending on the location
   * @type {string[]}
   */
  genres = []
  /**
   * Climatic station from the anime. If the station is not defined then
   * the default value is null
   * @type {(ClimaticStation | null)}
   * @default null
   */
  station = null;
  /**
   * Specifies the chronological order of the anime
   * @type {Chronology[]}
   */
  chronology = [];
  /**
   * Anime episodes available. If the anime is on air it will only show the
   * available episodes, and if it is not on air it will show all the episodes.
   * @type {Episode[]}
   */
  episodes = [];
  /**
   * Specifies whether the anime is currently airing or has already aired
   * @type {boolean}
   * @default false
   */
  active = false;
}

/* Search */

/**
 * General information about an anime. The class contains information
 * that can be found on any anime website.
 * @author Zukaritasu
 */
export class AnimeSearch {
  /**
   * Specifies the name of the anime being searched for
   * @type {string}
   */
  name;
  /**
   * The cover image of the anime
   * @type {string}
   */
  image;
  /**
   * The URL of the anime
   * @type {string}
   */
  url;
  /**
   * Defines whether the anime refers to a movie, ova, or ona
   * @type {string}
   */
  type;
  /**
   * @param {string} name anime name
   * @param {string} image the url of the anime image
   * @param {string} url the url of the anime
   * @param {string} type anime type
   */
  constructor(name, image, url, type = null) {
      this.name = name;
      this.image = image;
      this.url = url;
      this.type = type;
  }
}

/**
 * Contains the result of the anime search through a filter
 * and the page number that specifies where the search should be
 * performed or was performed.
 * @author Zukaritasu
 */
export class SearchArray {
  /**
   * This array contains the anime that are the result of the search
   * @type {Anime[]}
   */
  data = [];
  /**
   * The number of the page where the search was made
   * @type {(string | number)}
   */
  page;
  /**
   * @type {(string | number)} page the search page number
   */
  constructor(page) {
      this.data = new Array();
      this.page = page
  }
}
