//anime data return standard

import { BaseMedia, type IBaseMedia } from "./base";
import { ICalendar, IDatePeriod } from "./date";
import { IEpisode } from "./episode";
import { IImage } from "./image";

//spanish providers - TypeScript version

/** Specifies the type of anime to which its content refers. */
export type AnimeType = "Anime" | "Movie" | "OVA" | "ONA" | "Null";
/** Specify the climatic season in which the anime was published. */
export type ClimaticStation = "Summer" | "Autumn" | "Winter" | "Spring";

/**
 * Spectify the rating and stats in the anime
 * @author Zukaritasu
 */
export interface IAnimeStats {
  score?: string | number;
  views?: string | number;
  rating?: string | number; // stars
}

/**
 * Spectify chronology to that anime, in some pages puts what anime
 * should you see before to that anime
 *
 * @author Mawfyy
 */
export interface IChronology {
  name: string;
  url: `/anime/${string}/name/${string}` | string;
  image?: string;
}

/**
 * Spectify the anime structure that you scrapped
 * @author Zukaritasu
 */
export interface IAnimeMedia extends IBaseMedia {
  /**
   * An <a href="./image.ts">IImage</a> interface object representing the anime
   * image and its banner. */
  image: IImage;
  /** URL or location of the anime in the API. */
  url: `/anime/${string}/name/${string}` | string;
  /** Anime identifier that can be used when the anime name is not used in the URL. */
  id?: number;
  /**
   * The date from when the anime started until it ended. The end date may be
   * auxiliary in case the anime has not ended. */
  date?: IDatePeriod | ICalendar;
  /** The type of anime that indicates whether it is a movie, a special, TV, etc.. */
  type?: AnimeType;
  /** Climatic station of which the anime was released */
  station?: ClimaticStation | string;
  /**
   * Most anime websites have an anime statistics section including ratings and
   * number of views, etc... */
  stats?: IAnimeStats;
  /** Chronology of the anime. It is an array that contains the anime related to it. */
  chronology?: IChronology[];
  /**
   * A list of the episodes of this anime. This property must be null or not used
   * if an IAnime object is used in IChronology. */
  episodes?: IEpisode[];
}

/**---------------- Interfaces implementation ---------------- **/

/**
 * Spectify the rating and stats in the anime
 * @author Zukaritasu
 */
export class AnimeStats implements IAnimeStats {
  /** Anime score */
  score?: string | number;
  /** The number of views of the anime */
  views?: string | number;
  /**  */
  rating?: string | number;
}

/**
 * Spectify chronology to that anime, in some pages puts what anime
 * should you see before to that anime
 *
 * @author Mawfyy
 */
export class Chronology implements IChronology {
  /** @inheritdoc */
  name: string;
  /** @inheritdoc */
  url: `/anime/${string}/name/${string}` | string;
  /** @inheritdoc */
  image?: string;

  constructor(name?: string, url?: string, image?: string) {
    this.name = name;
    this.url = url;
    this.image = image;
  }
}

/**
 * Spectify the anime structure that you scrapped
 * @author Zukaritasu
 */
export class AnimeMedia extends BaseMedia implements IAnimeMedia {
  /** @inheritdoc */
  image: IImage;
  /** @inheritdoc */
  url: `/anime/${string}/name/${string}` | string;
  /** @inheritdoc */
  id?: number;
  /** @inheritdoc */
  date?: IDatePeriod | ICalendar;
  /** @inheritdoc */
  type?: AnimeType;
  /** @inheritdoc */
  station?: ClimaticStation | string;
  /** @inheritdoc */
  stats?: IAnimeStats;
  /** @inheritdoc */
  chronology?: IChronology[];
  /** @inheritdoc */
  episodes?: IEpisode[];
}
