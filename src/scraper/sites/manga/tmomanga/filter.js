import axios from "axios";
import * as cheerio from "cheerio";
import utils from "../../../../utils/utilities.js";

/**
 * 
 * @param {string} name 
 * @param {string} genre
 * @return
 */
function getSearchURL(name, genre) {
    if (utils.isUsableValue(genre))
        url = `https://tmomanga.com/genero/${genre.toLowerCase().replace(' ', '-')}`;
    else if (utils.isUsableValue(name))
        url = `https://tmomanga.com/biblioteca?search=${encodeURI(name).split('%20').join('+')}`;
	return null;
}

/**
 * 
 * @param {string} name 
 * @param {string} genre 
 * @param {number} page 
 */
export async function filter(name, genre, page) {
    try {
		let search_url = getSearchURL(name, genre);
		if (search_url != null) {
			let mangas = [];
			if (utils.isUsableValue(page))
				search_url += `?page=${page}`;
			const $ = cheerio.load((await axios.get(search_url)).data);
			const elements = $($('div.main-col-inner').get(0)).find('div.row').children();
			for (let i = 0; i < elements.length; i++)
				mangas.push($(elements[i]).find('h3 a').attr('href'));
			return mangas;
		}
    } catch (error) {
        console.log(error);
    }
}
