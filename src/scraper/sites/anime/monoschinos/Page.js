import axios from "axios";
import * as cheerio from "cheerio";
import { Anime, Episode, Image } from "../../../../utils/schemaProviders.js";

const PageInfo = {
    url: 'https://monoschinos2.com' // url page
}

/**
 * 
 * @param {*} url 
 * @returns {EpisodeServer[]}
 */
async function getEpisodeServers(url) {
    let servers = [];
    const $ = cheerio.load((await axios.get(url)).data);
    $('div.playother').children().each((i, element) => {
		servers.push(new EpisodeServer($(element).text().trim(), atob($(element).attr('data-player'))))
        /*if (anime != null && anime[0] == null) {
            anime[0] = $('div.lista').find('a').attr('href'); // anime url
        }*/
    });
    return servers;
}

/**
 * @param {CheerioAPI} $ HTML Document by cheerio
 * @param {Element} element episode document
 * @returns {Episode}
 */
async function getEpisode($, element) {
	const episode  = new Episode();
    episode.number = parseInt($(element).find('div.positioning p').text().trim());
    episode.image  = $(element).find('div.animeimgdiv img.animeimghv').attr('data-src');
    episode.name   = $(element).find('h2.animetitles').text().trim();
    episode.url    = $(element).find('a').attr('href');
	episode.servers.push(...(await getEpisodeServers(episode.url)));
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
        $('div.heroarea div.heroarea1 div.row').children().each(async (i, element) => {
            if ($(element).children().length != 0) {
                episodes.push(await getEpisode($, element));
            }
        });
        return episodes;
    } catch (error) {
        console.log(error);
    }
    return null;
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
		// Warning!! the following code does not list the servers of the
		// episode, it only specifies the link
        const episode  = new Episode();
        episode.number = parseInt($(element).attr('data-episode').trim());
        episode.image  = $(element).find('img.animeimghv').attr('data-src');
        episode.name   = $(element).find('img.animeimghv').attr('alt');
        episode.url    = $(element).find('a').attr('href');
		//episode.servers | Not used
        episodes.push(episode);
    });
	return episodes;
}

/**
 * 
 * @param {string} url 
 * @returns {Anime}
 */
async function getAnime(url) {
	// The anime page in monoschinos does not define the chronology and station
    const $ = cheerio.load((await axios.get(url)).data);
    const anime    = new Anime();
    anime.name     = $('div.chapterdetails').find('h1').text();
	anime.alt_name = $('div.chapterdetails').find('span.alterno').text();
    anime.url      = url;
    anime.synopsis = $('div.chapterdetls2 p').text().trim();
    anime.genres   = getGenres($);
    anime.image    = new Image($('div.chapterpic img').attr('src'), $('div.herobg img').attr('src'));
    anime.active   = 'estreno' === $('div.butns button.btn1').text().toLowerCase().trim();
	anime.episodes = getAnimeEpisodes($);

    $('div.chapterdetails nav').children().each((i, element) => {
        if (i == 1) {
			// The year of the anime is extracted. The format shown on the
			// website is 'dd from mm from yyyy'.
            const date = $(element).find('ol.breadcrumb li.breadcrumb-item').text();
            for (let i = date.length - 1; i >= 0; i--) {
                if (date[i] === ' ') {
                    anime.year = parseInt(date.substring(i, date.length));
                    return false;
                }
            }
        }
    });

    return anime;
}

/**
 * 
 * @returns {Anime[]}
 */
async function getLastAnimes(url) {
    try {
        let animes = [];
		const use_filter = (url != null && url != undefined);
        const $ = cheerio.load((await axios.get(use_filter ? url : `${ PageInfo.url }/emision`)).data);
        const elements = $('div.heroarea div.heromain div.row').children();
        for (let i = 0; i < elements.length; i++) {
            if ($(elements[i]).children().length != 0) {
                animes.push(await getAnime($(elements[i]).find('a').attr('href')));
            }
        }
        return animes;
    } catch (error) {
        console.log(error);
    }
    return [];
}

//console.log(await getLastAnimes('https://monoschinos2.com/animes?categoria=anime&genero=accion&fecha=2023&letra=A'));

//console.log(await getAnime('https://monoschinos2.com/anime/mou-ippon-sub-espanol'))

export default { getLastEpisodes, getLastAnimes };