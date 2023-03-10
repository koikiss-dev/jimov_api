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
	(await page.getLastAnimes(`https://monoschinos2.com/animes?categoria=${category}&genero=${genre}&fecha=${year}&letra=${letter}`))
		.forEach(element => {
			animes.data.push(new AnimeSearch(element.name, element.image.url, element.url, category))
		});
	return animes;
}
filter('anime', 'carrera').then(f => {
	console.log(f)
})
export default { filter };

