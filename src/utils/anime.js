/**
 * Copyright (c) 2023 JIMOV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Episode } from "./episode";
import { Image } from "./image";

/**
 * Specifies the anime climatic station
 * @readonly
 * @enum {String}
 */
export const ClimaticStation = {
	Summer: Symbol('summer'),
	Autumn: Symbol('autumn'),
	Winter: Symbol('winter'),
	Spring: Symbol('spring'),
}

/**
 * Anime chronology
 * @author Zukaritasu
 */
export class Chronology {
	/**
	 * The name of the anime
	 * @type {string}
	 */
	name;
	/**
	 * The URL of the anime. It can also refer to movies, ovas and onas.
	 * @type {string}
	 */
	url;
	/**
	 * The cover image of the anime
	 * @type {string}
	 */
	image;
}

/**
 * General information about an anime. The class contains information
 * that can be found on any anime website.
 * @author Zukaritasu
 */
export class Anime {
	/**
	 * The name of the anime
	 * @type {string}
	 */
	name;
	/**
	 * The URL of the anime
	 * @type {string}
	 */
	url;
	/**
	 * Anime synopsis
	 * @type {string}
	 */
	synopsis;
	/**
	 * The cover and banner of the anime
	 * @type {Image}
	 */
	image;
	/**
	 * The year the anime was released
	 * @type {number}
	 */
	year;
	/**
	 * Anime genres. Genres are defined by a text string in English or
	 * Spanish depending on the location
	 * @type {string[]}
	 */
	genres     = []
	/**
	 * Climatic station from the anime. If the station is not defined then
	 * the default value is null
	 * @type {(ClimaticStation | null)}
	 * @default null
	 */
	station    = null;
	/**
	 * Specifies the chronological order of the anime
	 * @type {Chronology[]}
	 */
	chronology;
	/**
	 * Anime episodes available. If the anime is on air it will only show the
	 * available episodes, and if it is not on air it will show all the episodes.
	 * @type {Episode[]}
	 */
	episodes   = []
}