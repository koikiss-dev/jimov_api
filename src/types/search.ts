
//Spanish Providers - TypeScript version

/*
 * Anime search helpers, use them with you scrapping by filter (searching..), 
 * this format help you how you can return 
 * theses results
 *
 * @author Mawfyy
 */

export interface IAnimeSearch {
  name: string;
  image: string;
  url: `/anime/${string}/name/${string}` | string; // API url
  type?: string;
}

export interface IPageNavigation {
  count?: number;
  current?: number;
  next?: number;
  hasNext?: boolean
}

export interface IResultSearch {
  nav?: IPageNavigation;
  results: IAnimeSearch[];
}

export class AnimeSearch implements IAnimeSearch {
  name: string;
  image: string;
  url: `/anime/${string}/name/${string}` | string; // API url
  type?: string;
}

export class ResultSearch implements IResultSearch {
  nav?: IPageNavigation;
  results: IAnimeSearch[] = [];
}

/** end */
