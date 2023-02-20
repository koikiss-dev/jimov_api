import { AnimeSearch, SearchArray } from "../../../../utils/schemaProviders.js";
import page from "./Page.js";

/**
 * @param {string} category 
 * @param {string} genre 
 * @param {string} year 
 * @param {string} letter 
 * @returns 
 */
async function filter(category, genre, year, letter) {
	const animes = new SearchArray('1');
	
	// the function getLastAnimes returns an array of type Anime no matter
	// if the array is empty, it never returns null
	const __eval = (value => { return value == null || value == undefined ? false : value });
	(await page.getLastAnimes(`https://monoschinos2.com/animes?categoria=${__eval(category)}&genero=${__eval(genre)}&fecha=${__eval(year)}&letra=${__eval(letter)}`))
		.forEach(element => {
			animes.data.push(new AnimeSearch(element.name, element.image.url, element.url, category))
		});
	return animes;
}

console.log(await filter('anime', 'accion', 2020, 'A'))

export default { filter };

