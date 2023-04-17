import { IImage } from "./image";

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface IMangaChapter {
  id: string;
  title: string;
  volume?: number;
  chapterNumber?: number;
  releaseDate?: Date;
  url: `/manga/${string}/chapter/${string}`;
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
export interface IChapterPages {
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
  volume?: number;
  chapterNumber?: number;
  releaseDate?: Date;
  url: `/manga/${string}/chapter/${string}`;
}

export class Chapter implements IChapterPages{
  cap?: number | string;
  page?: number | string;
  results: IImage[];
}