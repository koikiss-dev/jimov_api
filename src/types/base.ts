/**
 * Here will stay all possible names of the types of providers. These options
 * will be used to create a new URL of the media in the API. Modify it every
 * time you need to add a new type of provider.
 *
 * Examples: `/anime/flv/...` or `/manga/comick/...`
 *
 * @author Victor
 */
export type MediaURLOptions = "anime" | "manga";

/**
 * The base interface to create new types of providers.
 *
 * @author Victor
 */
export interface IBaseMedia {
  /** Name or title of the media */
  name: string;
  /** URL or location of the media in the API. */
  url: `/${MediaURLOptions}/${string}/name/${string}` | string;
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
 * The base interface to create new search results of any new type of provider.
 *
 * @author Victor
 */
export interface IBaseResult {
  /** Name of the media that was the result of your search */
  name: string;
  /** The media URL from the API */
  url: `/${MediaURLOptions}/${string}/name/${string}` | string;
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
  url: `/${MediaURLOptions}/${string}/name/${string}` | string;
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
  /** @inheritdoc */
  url: `/${MediaURLOptions}/${string}/name/${string}` | string;
}
