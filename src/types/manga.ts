import { IImage } from "./image";

/* export interface IChapter{
    name?: string;
    url: `/manga/${string}/chapter/${string | number}`;
    number?: number | string;
    image?: string;
}

export interface IMangaChapter {
  id: string;
  name: string;
  volume?: number;
  pages?: number;
  releaseDate?: string;
  url: `/manga/${string}/chapter/${string | number}`;
}
export interface IMangaChapterPage {
  img: string;
  page: number;
}
export interface IMangaResult {
    id?: number | string;
    name: string;
    alt_name?: string | string[];
    image?: IImage;
    description?: string;
    status?: string | boolean;
    date?: number | string;
}


export interface IMangaInfo extends IMangaResult {
    malId?: number | string;
    authors?: string[];
    genres?: string[];
    characters?: any[];
    recommendations?: IMangaResult[];
    chapters?: IMangaChapter[];
    nsfw?: boolean;
  }
   */

export interface IMangaChapter {
  id: string;
  name: string;
  volume?: number;
  pages?: number;
  releaseDate?: string;
  url: `/manga/${string}/chapter/${string | number}`;
}

export interface IManga {
  name: string;
  alt_name?: string | string[];
  image?: IImage;
  description?: string;
  status?: string | boolean;
  date?: number | string;
  malId?: number | string;
  authors?: string[];
  genres?: string[];
  characters?: any[];
  chapters?: IMangaChapter[];
  nsfw?: boolean;
}

export interface IMangaSearch {
  name: string;
  image?: string;
  date?: number | string;
  url: `/manga/${string}/title/${string}`;
}

export class Manga implements IManga {
  name: string;
  alt_name?: string | string[];
  image?: IImage;
  description?: string;
  status?: string | boolean;
  date?: number | string;
  malId?: number | string;
  authors?: string[];
  genres?: string[];
  characters?: any[];
  chapters?: IMangaChapter[];
  nsfw?: boolean;
}

export class MangaSearch implements IMangaSearch {
  name: string;
  image?: string;
  date?: number | string;
  url: `/manga/${string}/title/${string}`;
}
