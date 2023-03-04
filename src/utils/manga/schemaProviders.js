import { Image } from '../schemaProviders.js';

/**
 * 
 */
export class ChapterView {
    title;
    url;
    image;
    manga;
}

/**
 * Describes a manga chapter with its basic information including the
 * title and an array containing the images or pages of the chapter.
 * 
 * @author Zukaritasu
 * @see {Manga}
 */
export class Chapter {
    /**
     * The title of the manga chapter. This may contain the chapter number.
     * @type {Image}
     */
    title;
    /**
     * The manga chapter number. The value can be expressed in string or
     * number if possible.
     * @type {(string | number)}
     * @default 0
     */
    number = 0;
    /**
     * The URL of the manga chapter
     * @type {string}
     */
    url;
    /**
     * Array containing the URLs of the images or pages of the manga chapter.
     * It can also contain the cover 
     * @type {string[]}
     */
    images = [];
    /**
     * The cover of the manga chapter. All chapters contain a cover being
     * the first page or image. It can be extracted from the first element
     * of the array images
     * @type {string}
     */
    cover;
}

/**
 * Defines the structure or how a manga is constituted. Keep in mind that
 * most of the manga provider pages do not describe volumes or arcs, so
 * the 'chapters' property contains all the chapters without the need to
 * separate them by volumes or arcs.
 * 
 * @author Zukaritasu
 * @see {Chapter}
 * @see '../schemaProviders.js#Image'
 */
export class Manga {
    /**
     * The title of the manga
     * @type {string}
     */
    title;
    /**
     * The URL of the manga
     * @type {string}
     */
    url;
    /**
     * The cover of the manga. It can also be the banner and if that is the
     * case use the Image class of the anime providers schema
     * @type {Image}
     * @see '../schemaProviders.js#Image'
     */
    image;
    /**
     * The year of publication of the manga
     * @type {number}
     */
    year;
    /**
     * Description or synopsis of the manga
     * @type {string}
     */
    synopsis;
    /**
     * Manga genres
     * @type {string[]}
     */
    genres = [];
    /**
     * Manga chapters. Most of the pages of manga do not define volumes
     * and arcs, so all the chapters are in a single array
     * @type {(Chapter[] | string[])}
     */
    chapters = [];
}