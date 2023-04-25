import { IImage } from "./image";

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface IMangaChapter {
  id: string;
  title: string;
  chapterNumber?: number;
  releaseDate?: Date;
  url: `/manga/${string}/chapter/${string}`;
}

export interface IVolume {
  id: string;
  volume?: string;//name
  volumeNumber?: number;//number
  releaseDate?: Date;
  thumbnail?: IImage;
  url?: `/manga/${string}/volume/${string}`;//title or number
}

export interface IManga {
  id: string;
  title: string;
  altTitles?: string[];
  thumbnail?: IImage;
  description?: string;
  status?: "ongoing" | "completed";
  authors?: string[];
  genres?: string[];
  characters?: string[];
  chapters?: IMangaChapter[];
  isNSFW: boolean;
}
export interface IPages {
  cap?: number | string;
  page?: number | string;
  results: IImage[];
}

export interface IMangaSearchResult {
  id: string;
  title: string;
  thumbnail?: IImage;
  url: `/manga/${string}/title/${string}`;
}

export class Manga implements IManga {
  id: string;
  title: string;
  altTitles?: string[];
  thumbnail?: IImage;
  description?: string;
  status?: "ongoing" | "completed";
  authors?: string[];
  genres?: string[];
  characters?: string[];
  chapters?: IMangaChapter[];
  isNSFW: boolean;
}

export class MangaSearch implements IMangaSearchResult {
  id: string;
  title: string;
  thumbnail?: IImage;
  url: `/manga/${string}/title/${string}`;
}

export class MangaChapter implements IMangaChapter {
  id: string;
  title: string;
  chapterNumber?: number;
  releaseDate?: Date;
  url: `/manga/${string}/chapter/${string}`;
}

export class Pages implements IPages{
  cap?: number | string;
  page?: number | string;
  results: IImage[];
}

export class MangaVolume implements IVolume {
  id: string;
  volume?: string;//name
  volumeNumber?: number;//number
  releaseDate?: Date;
  thumbnail?: IImage;
  url?: `/manga/${string}/volume/${string}`;//title or number
}