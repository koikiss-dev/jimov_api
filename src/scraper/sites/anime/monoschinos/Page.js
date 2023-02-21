import axios from "axios";
import * as cheerio from "cheerio";
import { Anime, Episode, Image, EpisodeServer } from "../../../../utils/schemaProviders.js";
import utilities from "../../../../utils/utilities.js";

const PageInfo = {
    url: 'https://monoschinos2.com' // url page
}

//================== API functions ==================

/** Replaces the original URL with the API URL */
function api_getEpisodeURL(url) {
	return url.replace('https://monoschinos2.com/ver/', '/anime/monoschinos/servers/');
}

/** Replaces the original URL with the API URL */
function api_getAnimeURL(url) {
	return url.replace('https://monoschinos2.com/anime/', '/anime/monoschinos/name/');
}

//===================================================

/**
 * This function returns a list of servers where the episode is located.
 * The URLs of the servers are Base64 encoded.
 * 
 * @param {string} url the URL of the episode
 * @returns {EpisodeServer[]}
 */
async function getEpisodeServers(url) {
    let servers = [];
    const $ = cheerio.load((await axios.get(url)).data);
    $('div.playother').children().each((i, element) => {
		servers.push(new EpisodeServer($(element).text().trim(), 
            Buffer.from($(element).attr('data-player'), 'base64').toString('binary'))
        );
    });
    return servers;
}

/**
 * @param {CheerioAPI} $ HTML Document by cheerio
 * @param {Element} element episode document
 * @returns {Episode}
 */
async function getEpisodeByElement($, element) {
	const episode  = new Episode();
    episode.number = parseInt($(element).find('div.positioning p').text().trim());
    episode.image  = $(element).find('div.animeimgdiv img.animeimghv').attr('data-src');
    episode.name   = $(element).find('h2.animetitles').text().trim();
    episode.url    = api_getEpisodeURL($(element).find('a').attr('href'));
	return episode;
}

/**
 * 
 * @returns {Episode[]}
 */
async function getLastEpisodes() {
    try {
        let episodes = [];
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
		const elements = $('div.heroarea div.heroarea1 div.row').children();
        for (let i = 0; i < elements.length; i++) {
            if ($(elements[i]).children().length != 0) {
                episodes.push(await getEpisodeByElement($, elements[i]));
            }
        }
        return episodes;
    } catch (error) {
        console.log(error);
    }
    return [];
}

/**
 * 
 * @param {Cheerio<Element>} $ 
 * @returns {string[]}
 */
function getGenres($) {
    let genres = [];
    $('div.chapterdetls2 table tbody a').each((i, element) => {
        genres.push($(element).text().trim())
    });
    return genres;
}

/**
 * 
 * @param {Object} $ 
 * @returns {Episode[]}
 */
function getAnimeEpisodes($) {
	let episodes = [];
	$('div.heromain2 div.allanimes div.row').children().each((i, element) => {
        const episode  = new Episode();
        episode.number = parseInt($(element).attr('data-episode').trim());
        episode.image  = $(element).find('img.animeimghv').attr('data-src');
        episode.name   = $(element).find('img.animeimghv').attr('alt');
        episode.url    = api_getEpisodeURL($(element).find('a').attr('href'));
        episodes.push(episode);
    });
	return episodes;
}

const calendar = [
	[['enero', 'febrero',         'marzo'],    'invierno'],
	[['abril', 'mayo',            'junio'],   'primavera'],
	[['julio', 'agosto',     'septiembre'],      'verano'],
	[['octubre', 'noviembre', 'diciembre'],       'otoño'],
];

/**
 * The calendar of the anime is extracted. The format shown on the 
 * website is 'dd from mm from yyyy'.
 * 
 * @param {object} element 
 * @returns {object} the calendar of anime
 */
function getAnimeCalendar(element) {
    const date  = element.find('ol.breadcrumb li.breadcrumb-item').text().trim().split(' ');
    if (date.length != 5)
        return { year: 0, station: null };
    else {
        let station = calendar.find(value => value.at(0).find(month => month === date[2].toLowerCase()));
        return { year: date.pop(), station: station == undefined ? null : station[1] };
    }
}

/**
 * 
 * @param {string} url 
 * @returns {Anime}
 */
async function getAnime(url) {
	// The anime page in monoschinos does not define the chronology and type
    const $        = cheerio.load((await axios.get(url)).data);
    const calendar = getAnimeCalendar($($('div.chapterdetails nav').children()[1]));
    const anime    = new Anime();
    anime.name     = $('div.chapterdetails').find('h1').text();
	anime.alt_name = $('div.chapterdetails').find('span.alterno').text();
    anime.url      = api_getAnimeURL(url);
    anime.synopsis = $('div.chapterdetls2 p').text().trim();
    anime.genres   = getGenres($);
    anime.image    = new Image($('div.chapterpic img').attr('src'), $('div.herobg img').attr('src'));
    anime.active   = 'estreno' === $('div.butns button.btn1').text().toLowerCase().trim();
	anime.episodes = getAnimeEpisodes($);
    anime.year     = calendar.year;
    anime.station  = calendar.station;
    return anime;
}

/**
 * 
 * @returns {Anime[]}
 */
async function getLastAnimes(url) {
    try {
        let animes = [];
        const $ = cheerio.load((await axios.get(url ?? `${PageInfo.url}/emision`)).data);
        const elements = $('div.heroarea div.heromain div.row').children();
        for (let i = 0; i < elements.length; i++) {
            const href = $(elements[i]).find('a').attr('href');
            if (utilities.isUsableValue(href) && href !== 'https://monoschinos2.com/emision?p=2') {
                animes.push(await getAnime(href));
            }
        }
        return animes;
    } catch (error) {
        console.log(error);
    }
    return [];
}

//console.log(await getLastAnimes('https://monoschinos2.com/animes?categoria=anime&genero=accion&fecha=2023&letra=A'));

//console.log(await getLastAnimes())

export default 
{ 
    getLastEpisodes, 
    getLastAnimes,
    getEpisodeServers,
    getAnime
};