import type { IImage } from "./image";

/**
 * The base interface to create new types of providers.
 *
 * @author Victor
 */
export interface IBaseMedia {
  /** Name or title of the media */
  name: string;
  /** Alternative names or titles in different languages. */
  alt_names?: string[] | string;
  /** Description or synopsis of the media. */
  synopsis?: string;
  /** Genres that apply to the media. */
  genres?: string[];
  /** Indicates the status of the media, such as ongoing, completed, on air, finished, or on hold. */
  status?: string | boolean | "ongoing" | "completed";
  /** Indicates if the content is intended for adult audiences. */
  nsfw?: boolean;
}

/**
 * The base interface to create new chapter classes for new types of providers.
 *
 * @author Victor
 */
export interface IBaseChapter {
  /**
   * Name of the media chapter. May contain the chapter number concatenated
   * with the media name.
   */
  name: string;
  /** The chapter number. */
  num: number;
  /** The image of the chapter shown as thumbnail */
  thumbnail?: IImage;
}

/**
 * The base interface to create new search results of any new type of provider.
 *
 * @author Victor
 */
export interface IBaseResult {
  /** Name of the media that was the result of your search */
  name: string;
}

/**
 * Create the structure of the base media.
 *
 * @author Victor
 */
export abstract class BaseMedia implements IBaseMedia {
  /** @inheritdoc */
  name: string;
  /** @inheritdoc */
  alt_names?: string[] | string;
  /** @inheritdoc */
  synopsis?: string;
  /** @inheritdoc */
  genres?: string[];
  /** @inheritdoc */
  status?: string | boolean | "ongoing" | "completed";
  /** @inheritdoc */
  nsfw?: boolean;
}

/**
 * Create the result search of the base media.
 *
 * @author Victor
 */
export abstract class BaseResult implements IBaseResult {
  /** @inheritdoc */
  name: string;
}

/**
 * Extends the properties of a base chapter to create a new one.
 *
 * @author Victor
 */
export abstract class BaseChapter implements IBaseChapter {
  /** @inheritdoc */
  name: string;
  /** @inheritdoc */
  num: number;
  /** @inheritdoc */
  thumbnail?: IImage;
}
