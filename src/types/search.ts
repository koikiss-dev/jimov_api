//Spanish Providers - TypeScript version

/**
 * Anime search helpers, use them with you scrapping by filter (searching..), 
 * this format help you how you can return 
 * theses results
 *
 * @author Mawfyy
 * @author Zukaritasu
 */
export interface IAnimeSearch {
  /** Name of the anime that was the result of your search */
  name: string;
  /** The URL of the anime image */
  image: string;
  /** The anime URL from the API */
  url: `/anime/${string}/name/${string}` | string; // API url
  /** 
   * Defines the type of content to which the anime is directed, which
   * can be a movie, OVA, ONA, etc... */
  type?: string;
}

/**
 * To navigate more easily among the infinite number of results that the
 * API can return, we use this interface in which there is information
 * about which page is being searched and how many pages are still available.
 * 
 * @author Zukaritasu
 */
export interface IPageNavigation {
  /** number of pages available to search */
  count?: number;
  /** page number where you are currently located */
  current?: number;
  /** the next page number */
  next?: number;
  /** Indicates if there is a next page available */
  hasNext?: boolean
}

/**
 * Search results including information on the page number of the
 * searched web site
 * 
 * @author Zukaritasu
 */
export interface IResultSearch<T> {
  /** Search by navigation */
  nav?: IPageNavigation;
  /** A list of the results obtained */
  results: T[];
}

/**
 * Anime search helpers, use them with you scrapping by filter (searching..), 
 * this format help you how you can return 
 * theses results
 *
 * @author Mawfyy
 * @author Zukaritasu
 */
export class AnimeSearch implements IAnimeSearch {
  /** @inheritdoc */
  name: string;
  /** @inheritdoc */
  image: string;
  /** @inheritdoc */
  url: `/anime/${string}/name/${string}` | string; // API url
  /** @inheritdoc */
  type?: string;
}

/**
 * Search results including information on the page number of the
 * searched web site
 * 
 * @author Zukaritasu
 */
export class ResultSearch<T> implements IResultSearch<T> {
  /** @inheritdoc */
  nav?: IPageNavigation;
  /** @inheritdoc */
  results: T[] = [];
}

/** end */
