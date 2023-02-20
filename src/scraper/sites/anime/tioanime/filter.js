//https://tioanime.com/directorio?type%5B%5D=0&genero%5B%5D=demonios&year=1950%2C2023&status=2&sort=recent

import { AnimeSearch, SearchArray } from "../../../../utils/schemaProviders.js";
import utilities from "../../../../utils/utilities.js";
import page from "./Page.js";

/**
 * 
 * @param {string} param 
 * @param {(number[] | string[])} array 
 */
function arrayToURLParams(param, array) {
	let elements = '';
	if (utilities.isUsableValue(array)) {
		array.forEach(option => {
			// %5B%5D > []
			elements += `${param}%5B%5D=${option}`;
		});
	}
	return elements;
}

/**
 * @param {number[]} types 0: Anime (TV), 1 Movie, 2: OVA, 3: ONA
 * @param {string[]} genres all genres
 * @param {Object} year_range { begin, end }
 * @param {number} status 2: Finalizado, 1: En emision, 3: Proximamente
 * @param {string} sort recent, -recent
 * @returns 
 */
async function filter(types, genres, year_range, status, sort) {
	const animes = new SearchArray('1');
	// If any of the arguments is null or undefined, a default value will be assigned.
	year_range ?? (year_range = { begin: 1950, end: new Date().getFullYear() });
	(await page.getLastAnimes(`https://tioanime.com/directorio?${arrayToURLParams('type', types)}&${arrayToURLParams('genre', genres)}&year=${year_range.begin}%2C${year_range.end}&status=${status ?? 2}&sort=${sort ?? 'recent'}`))
		.forEach(element => {
			if (utilities.isUsableValue(element)) {
				animes.data.push(new AnimeSearch(element.name, element.image.url, element.url, element.type))
			}
		});
	return animes;
}

export default { filter }