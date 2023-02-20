import axios from "axios";
import * as cheerio from "cheerio";
import { Anime, Episode, Image, Chronology, EpisodeServer } from "../../../../utils/schemaProviders.js";
import utilities from "../../../../utils/utilities.js";

const PageInfo = {
    url: 'https://tioanime.com' // url page
}

//================== API functions ==================

function api_getURL(url) {
	return url.replace()
}

//===================================================

/**
 * 
 * @param {*} $ 
 * @return {Chronology[]}
 */
function getAnimeChronology($) {
    let chrono_list = [];
    $('section.w-history ul.list-unstyled li').each((i, element) => {
		// The chronological anime has to access its year and type as extra
		// information that is not included in the Chronology class
		chrono_list.push(new Chronology(
				$(element).find('h3.title').text(), 
				PageInfo.url + $(element).find('div.media-body a').attr('href'), 
				PageInfo.url + $(element).find('figure.fa-play-circle img').attr('src')
			));
    });
    return chrono_list;
}

/**
 * This function supports a full path of the episode and not a relative path.
 * Use PageInfo.url + /(relative path) in that case.
 *
 * @param {string} url anime episode url
 * @return {EpisodeServer[]}
 */
async function getEpisodeServers(url) {
	'use strict'
	let servers = []
    const $ = cheerio.load((await axios.get(url)).data);
	const script = $($('script').get().pop()).text().trim();
	try {
		// The variable 'videos' of the script is accessed
		eval?.(script.substring(0, script.indexOf('$(document)')));
		eval(script.substring(0, script.indexOf('$(document)')));
		for (let i = 0; i < globalThis.videos.length; i++) {
			servers.push(new EpisodeServer(globalThis.videos[i][0], 
				globalThis.videos[i][1].replace('\\', '')
			));
		}
	} catch (error) {
        
    }
	return servers;
}

/**
 * 
 * @param {Element} $ element anime
 * @return {Episode[]}
 */
async function getAnimeEpisodes(data) {
	let __episodes = [];
	data.episodes.forEach(episode_number => {
		let episode     = new Episode();
		episode.name    = `${data.info[2]} Capitulo ${episode_number}`;
		episode.image   = PageInfo.url +`/uploads/thumbs/${data.info[0]}.jpg`;
	  //episode.url     = PageInfo.url + `/ver/${data.info[1]}-${episode_number}`;
		episode.url     = `/anime/tioanime/servers/${data.info[1]}-${episode_number}`;
		episode.number  = episode_number;
        __episodes.push(episode);
	});
	return __episodes;
}

/**
 * 
 * @param {*} $ 
 * @param {*} elements
 * @returns {Episode}
 */
function getEpisode($, element) {
	const title   = $(element).find('h3.title').text().trim();
	const episode = new Episode();
	episode.image = PageInfo.url + $(element).find('figure.fa-play-circle img').attr('src');
  //episode.url   = PageInfo.url + $(element).find('article.episode a').attr('href');
	episode.url   = $(element).find('article.episode a').attr('href').replace('/ver/', '/anime/tioanime/servers/')
	
    for (let i = title.length - 1; i >= 0; i--) {
        if (title[i] == ' ') {
			episode.name   = title.substring(0, i).trim();
			episode.number = parseInt(title.substring(i + 1, title.length));
			break;
        }
    }
	return episode;
}

/**
 * 
 * @returns 
 */
async function getLastEpisodes() {
	let episodes = [];
    try {
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
		const elements = $('div.container section ul.episodes li').children();
		for (let i = 0; i < elements.length; i++) {
			episodes.push(getEpisode($, elements[i]));
		}
    } catch (error) {
        console.log(error);
    }
    return episodes;
}

/**
 * 
 * @param {*} $ 
 * @param {*} elements 
 */
function getGenres($, elements) {
    let genres = [];
    elements.each((i, element) => {
        genres.push($(element).find('a').text().trim());
    });
    return genres;
}

/**
 * 
 * @param {*} $
 * @returns {Object}
 */
function getScriptAnimeInfo($) {
	'use strict'
	try {
		const script = $($('script').get().pop()).text().trim();
		eval?.(script.substring(0, script.indexOf('$(document)')));
        eval(script.substring(0, script.indexOf('$(document)')));
		return {
			// An object with the variables initialized in the script is returned.
			info: globalThis.anime_info,
			episodes: globalThis.episodes
		}
	} catch(error) {
		console.log(error);
	}
	return null;
}

/**
 * This function supports a full path of the anime and not a relative path.
 * Use PageInfo.url + /(relative path) in that case.
 * 
 * @param {string} url anime url
 * @returns {Anime}
 */
async function getAnime(url) {
	// ignore property alt_name
	const $ = cheerio.load((await axios.get(url)).data);
	const data       = getScriptAnimeInfo($);
	// It is possible that the object returned by the getScriptAnimeInfo function is null.
	if (data == null) return null;
	
	const anime      = new Anime();
    anime.name       = $('div.container h1.title').text();
    //anime.url        = url;
	anime.url        = url.replace('https://tioanime.com/anime/', '/anime/tioanime/name/');
	anime.type       = $('div.meta span.anime-type-peli').text();
	//anime.year       = parseInt($('div.meta span.year').text().trim());
	anime.year       = data.info.length < 4 ? parseInt($('div.meta span.year').text().trim().substring(0, 4)) : 
											  new Date(data.info[3]).getFullYear();
    anime.synopsis   = $('p.sinopsis').text().trim();
    anime.genres     = getGenres($, $('div.container p.genres span'));
    anime.image      = new Image(PageInfo.url + $('div.container div.thumb figure img').attr('src'), 
											    $('figure.backdrop img').attr('src') == undefined ? null :
								 PageInfo.url + $('figure.backdrop img').attr('src')
												);
    anime.active     = $('div.thumb a.status').text() === 'En emision';
	anime.station    = $('div.meta span.fa-snowflake').text().trim().split('\n')[0];
	anime.episodes   = await getAnimeEpisodes(data);
	anime.chronology = getAnimeChronology($);
	return anime;
}

/**
 * 
 * @param {string} url 
 * @returns 
 */
async function getLastAnimes(url) {
    try {
        let animes = [];
        const $ = cheerio.load((await axios.get(url ?? PageInfo.url)).data);
		const elements = $(utilities.isUsableValue(url) ? 'ul.animes' : 'div.container section ul.list-unstyled.row li').children();
		for (let i = 0; i < elements.length; i++) {
            const anime_url = $(elements[i]).find('article.anime a').attr('href');
            if (utilities.isUsableValue(anime_url)) {
				animes.push(await getAnime(PageInfo.url + anime_url));
            }
		}
        return animes;
    } catch (error) {
        console.log(error);
    }
    return [];
}

/**
 * 
 * @param {*} section movies, ovas and onas
 * @returns {Anime[]}
 */
async function getSectionContents(section) {
	let animes = [];
    try {
        const $ = cheerio.load((await axios.get(`${PageInfo.url}/directorio?type%5B%5D=${section}`)).data);
		const elements = $(`ul.animes`).children();
		for (let i = 0; i < elements.length; i++) {
			animes.push(await getAnime(PageInfo.url + $(elements[i])
				.find('article.anime a').attr('href')));
		}
    } catch (error) {
        console.log(error);
    }
    return animes;
}

async function getLastMovies() {
    return await getSectionContents(1);
}

async function getLastOvas() {
    return await getSectionContents(2);
}

async function getLastOnas() {
    return await getSectionContents(3);
}

//console.log(await getEpisodeServers('https://tioanime.com/ver/getsuyoubi-no-tawawa-2-11'));

export default 
{
	getLastEpisodes, 
	getLastAnimes, 
	getLastMovies, 
	getLastOvas, 
	getLastOnas, 
	getEpisodeServers,
	getAnime
};
