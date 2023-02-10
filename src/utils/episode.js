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

/**
 * Basic information of the server where the episode is hosted
 * @author Zukaritasu
 */
export class EpisodeServer {
	/**
	 * The name of the server where the episode is hosted
	 * @type {string}
	 */
	name;
	/**
	 * The URL of the chapter. Some anime pages contain the URL of the
	 * episode encoded, it is up to the programmer to decode it.
	 * @type {string}
	 */
	url;
}

/**
 * This class represents the structure containing the general information
 * of an anime episode. It can also represent a movie, ova or onas.
 * @author Zukaritasu
 */
export class Episode {
	/**
	 * The name of the anime with its chapter number
	 * @type {string}
	 */
	name;
	/**
	 * The URL of the episode. This field cannot be null or undefined
	 * @type {string}
	 */
	url;
	/**
	 * Episode number. If it is a movie, the default value is 1
	 * @type {number}
	 * @default 1
	 */
	epinum;
	/**
	 * Servers where the chapter is hosted to watch the anime online
	 * @type {EpisodeServer[]}
	 */
	servers = [];
	/**
	 * The video thumbnail in the last chapters view
	 * @type {string}
	 */
	image;
	/**
	 * This function returns the episode number. Generally the episode
	 * number is at the end of the string, otherwise the function returns 0.
	 * @param {string} name - The name or title of the chapter containing the
	 * chapter number
	 * @returns Episode number
	 */
	static getEpisodeNumber(name) {
		if (typeof name === 'string') {
			for (let i = name.length - 1; i >= 0; i--) {
				if (name[i] === ' ') {
					return parseInt(name.substring(i, name.length).trim());
				}
			}
		}
		return 0;
	}
}
