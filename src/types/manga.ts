import { IImage } from "./image";
import { ICalendar } from "./date";
import { IResultSearch } from "./search";
import { BaseChapter, BaseMedia, type IBaseChapter, type IBaseMedia, type IBaseResult } from "./base";

/**
 * The chapter is part of the manga and is also part of a volume. It is made
 * with a set of images and a cover that is the first page of the chapter.
 *
 * @author Zukaritasu
 */
export interface IMangaChapter extends IBaseChapter {
  /** ID or chapter identifier of the chapter that is part of the manga */
  id: number | string;
  /** URL of the chapter in the API location */
  url: `/manga/${string}/chapter/${string}`;
  /**
   * Images of the manga chapter.
   * The first image may contain the cover of the chapter. */
  images: string[];
  /**
   * A brief description of what the new chapter brings. This property
   * is optional because not all websites have it available. */
  description?: string;
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
export interface IMangaMedia extends IBaseMedia {
  /** Manga ID */
  id: number | string;
  /** URL or location of the manga in the API. */
  url: `/manga/${string}/name/${string}` | string;
  /**
   * Manga cover or miniature. Some manga pages show the cover and the
   * banner, hence the use of the IImage interface. */
  thumbnail?: IImage;
  /** A list with the name of the authors of the manga */
  authors?: string[];
  /** A list of the characters that are part of the history of manga */
  characters?: string[];

  /** list of available languages */
  langlist?: string[];

  /**
   * Contains a total list of chapters that make up the manga.
   * The 'volumes' property indicates the rank in the list of chapters
   * that are part of the volume by their index. */
  chapters?: IMangaChapter[];
  /** A list of manga volumes */
  volumes?: IMangaVolume[];
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
export interface IMangaResult extends IBaseResult {
  /** Manga ID */
  id: number | string;
  /** The manga URL from the API */
  url: `/manga/${string}/name/${string}` | string;
  /**
   * Manga cover or miniature. Some manga pages show the cover and the
   * banner, hence the use of the IImage interface. */
  thumbnail?: IImage;
} //filter

/**
 * This class defines the basic properties that a manga website can
 * contain, including manga information, chapters and volumes.
 *
 * @author Zukaritasu
 */
export class MangaMedia extends BaseMedia implements IMangaMedia {
  /** @inheritdoc */
  id: string | number;
  /** @inheritdoc */
  url: `/manga/${string}/name/${string}` | string;
  /** @inheritdoc */
  thumbnail?: IImage;
  /** @inheritdoc */
  authors?: string[];
  /** @inheritdoc */
  characters?: string[];
  /** @inheritdoc */
  langlist?: string[];
  /** @inheritdoc */
  chapters?: IMangaChapter[];
  /** @inheritdoc */
  volumes?: IMangaVolume[];
}

////////////////////

/**
 * The chapter is part of the manga and is also part of a volume. It is made
 * with a set of images and a cover that is the first page of the chapter.
 *
 * @author Zukaritasu
 */
export class MangaChapter extends BaseChapter implements IMangaChapter {
  /** @inheritdoc */
  id: number | string;
  /** @inheritdoc */
  description?: string;
  /** @inheritdoc */
  url: `/manga/${string}/chapter/${string}`;
  /** @inheritdoc */
  images: string[] = [];
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
  url?: `/manga/${string}/volume/${string}`; // title or number
}
