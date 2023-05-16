import { IImage } from "./image";
import { ICalendar } from "./date";
import { IResultSearch } from "./search";

/**
 * The chapter is part of the manga and is also part of a volume. It is made
 * with a set of images and a cover that is the first page of the chapter.
 *
 * @author Zukaritasu
 */
export interface IMangaChapter {
  /** ID or chapter identifier of the chapter that is part of the manga */
  id: number | string;
  /** Chapter title. May contain the manga chapter number. */
  title: string;
  /**
   * A brief description of what the new chapter brings. This property
   * is optional because not all websites have it available. */
  description?: string;
  /** URL of the chapter in the API location */
  url: `/manga/${string}/chapter/${string}`;
  /** Chapter number */
  number: number;
  /**
   * Images of the manga chapter.
   * The first image may contain the cover of the chapter. */
  images: string[];
  /** The cover page of the chapter. Refers to the first page of the chapter. */
  cover?: string;
  /**
   * The date on which the chapter was published. This is optional because
   * in some cases it is not specified. */
  date?: ICalendar;
}

/**
 * A manga can be composed of several volumes that describe a part of
 * the story from that chapter. The 'range' property defines the
 * beginning and the end; it is a tuple containing 2 elements of which
 * the first element is the beginning (the chapter number) and the
 * second element the end of the volume (the number of the last chapter
 * of the volume).
 *
 * @author Zukaritasu
 */
export interface IMangaVolume {
  /** Manga volume ID */
  id: number | string;
  /**
   * Here we define the beginning and end of the volume, meaning that
   * the number of the first chapter of the volume is the beginning and
   * the last chapter is the end. */
  range: [number, number];
  /**
   * The title of the volume. The title may contain a short explanation
   * of what the volume contains. */
  title?: string;
  /**
   * Description or introduction that explains a little of what is to
   * come in the next chapters that make up the volume. */
  description?: string;
  /** Manga volume number */
  number?: number; //number
  /** Images of the manga volume. */
  images: string[];
  /** The date on which the first chapter of the volume was published. */
  date?: ICalendar;
  /**
   * The image or cover of the volume.
   * This property contains the URL of the image */
  thumbnail?: string;
  /** URL of the volume in the API location */
  url?: `/manga/${string}/volume/${string}`; // title or number
}

/**
 * This interface defines the basic properties that a manga website can
 * contain, including manga information, chapters and volumes.
 *
 * @author Zukaritasu
 */
export interface IManga {
  /** Manga ID */
  id: number | string;
  /** The URL of the manga in the API location */
  url: `/manga/${string}/title/${string}`;
  /** The title of the manga. */
  title: string;
  /** The title of the manga in other languages (alternative names) */
  altTitles?: string[];
  /**
   * Manga cover or miniature. Some manga pages show the cover and the
   * banner, hence the use of the IImage interface. */
  thumbnail?: IImage;
  /** Synopsis or description of the manga */
  description?: string;
  /** Indicates the status of the manga, in progress or completed. */
  status?: "ongoing" | "completed";
  /** A list with the name of the authors of the manga */
  authors?: string[];
  /** Genres manga */
  genres?: string[];
  /** A list of the characters that are part of the history of manga */
  characters?: string[];
  /**
   * Contains a total list of chapters that make up the manga.
   * The 'volumes' property indicates the rank in the list of chapters
   * that are part of the volume by their index. */
  chapters?: IMangaChapter[];
  /** A list of manga volumes */
  volumes?: IMangaVolume[];
  /** Indicates if the content of the manga is for +18 */
  isNSFW: boolean;
}

/**
 * At the end of the search the provider function returns an array with
 * the results of the filter, each result is stored in an instance of
 * this interface with enough basic information to perform a specific
 * query, so the API must return an array of IMangaResult. All this
 * information is encapsulated in the {@link IResultSearch} interface.
 *
 * @author Zukaritasu
 */
export interface IMangaResult {
  /** {@inheritdoc IManga.id} */
  id: number | string;
  /** {@inheritdoc IManga.title} */
  title: string;
  /** {@inheritdoc IManga.thumbnail} */
  thumbnail?: IImage;
  /** {@inheritdoc IManga.url} */
  url: `/manga/${string}/title/${string}`;
}//filter

/**
 * This class defines the basic properties that a manga website can
 * contain, including manga information, chapters and volumes.
 *
 * @author Zukaritasu
 */
export class Manga implements IManga {
  /** @inheritdoc */
  id: string;
  /** @inheritdoc */
  url: `/manga/${string}/title/${string}`;
  /** @inheritdoc */
  title: string;
  /** @inheritdoc */
  altTitles?: string[];
  /** @inheritdoc */
  thumbnail?: IImage;
  /** @inheritdoc */
  description?: string;
  /** @inheritdoc */
  status?: "ongoing" | "completed";
  /** @inheritdoc */
  authors?: string[];
  /** @inheritdoc */
  genres?: string[];
  /** @inheritdoc */
  characters?: string[];
  /** @inheritdoc */
  chapters?: IMangaChapter[];
  /** @inheritdoc */
  volumes?: IMangaVolume[];
  /** @inheritdoc */
  isNSFW: boolean;
}

////////////////////

/**
 * The chapter is part of the manga and is also part of a volume. It is made
 * with a set of images and a cover that is the first page of the chapter.
 *
 * @author Zukaritasu
 */
export class MangaChapter implements IMangaChapter {
  /** @inheritdoc */
  id: number | string;
  /** @inheritdoc */
  title: string;
  /** @inheritdoc */
  description?: string;
  /** @inheritdoc */
  url: `/manga/${string}/chapter/${string}`;
  /** @inheritdoc */
  number: number;
  /** @inheritdoc */
  images: string[] = [];
  /** @inheritdoc */
  cover?: string;
  /** @inheritdoc */
  date?: ICalendar;
}

/**
 * A manga can be composed of several volumes that describe a part of
 * the story from that chapter. The 'range' property defines the
 * beginning and the end; it is a tuple containing 2 elements of which
 * the first element is the beginning (the chapter number) and the
 * second element the end of the volume (the number of the last chapter
 * of the volume).
 *
 * @author Zukaritasu
 */
export class MangaVolume implements IMangaVolume {
  /** @inheritdoc */
  id: number | string;
  /** @inheritdoc */
  range: [number, number] = [0, 0];
  /** @inheritdoc */
  title?: string;
  /** @inheritdoc */
  description?: string;
  /** @inheritdoc */
  number?: number; //number
  /** @inheritdoc */
  images: string[];
  /** @inheritdoc */
  date?: ICalendar;
  /** @inheritdoc */
  thumbnail?: string;
  /** @inheritdoc */
  url?:`/manga/${string}/volume/${string}`; // title or number
}
