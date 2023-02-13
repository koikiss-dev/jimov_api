import axios from "axios";
import * as cheerio from "cheerio";
import { Anime, Episode, Image } from "../../../../utils/schemaProviders.js";

const PageInfo = {
    url: 'https://monoschinos2.com' // url page
}

/**
 * 
 * @param {*} url 
 * @returns 
 */
async function getEpisodeServers(url, anime /* variable reference */) {
    let servers = [];
    const $ = cheerio.load((await axios.get(url)).data);
    $('div.playother').children().each((i, element) => {
        if (anime != null && anime[0] == null) {
            anime[0] = $('div.lista').find('a').attr('href');
        }
        servers.push({
            server: $(element).text().trim(),
            video: atob($(element).attr('data-player'))
        });
    });
    return servers;
}

/**
 * 
 * @returns {Episode[]}
 */
async function getLastEpisodes() {
    try {
        let episodes = [Episode];
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
        $('div.heroarea div.heroarea1 div.row').children().each(async (i, element) => {
            if ($(element).children().length != 0) {
                const episode  = new Episode();
                episode.number = parseInt($(element).find('div.positioning p').text().trim());
                episode.image  = $(element).find('div.animeimgdiv img.animeimghv').attr('data-src');
                episode.name   = $(element).find('h2.animetitles').text().trim();
                episode.url    = $(element).find('a').attr('href');
                episodes.push(episode);
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
    const $ = cheerio.load((await axios.get(url)).data);
    const anime    = new Anime();
    anime.name     = $('div.chapterdetails').find('h1').text();
	anime.alt_name = url.split('/').pop();
    anime.url      = url;
    anime.synopsis = $('div.chapterdetls2 p').text().trim();
    anime.genres   = getGenres($);
    anime.image    = new Image($('div.chapterpic img').attr('src'), $('div.herobg img').attr('src'));
    anime.active   = 'estreno' === $('div.butns button.btn1').text().toLowerCase().trim();
	anime.episodes.push(...getAnimeEpisodes($));

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
async function getLastAnimes() {
    try {
        let animes = [];
        const $ = cheerio.load((await axios.get(`${ PageInfo.url }/emision`)).data);
        $('div.heroarea div.heromain div.row').children().each(async (i, element) => {
            if ($(element).find('a').attr('title') != undefined) {
                animes.push(await getAnime($(element).find('a').attr('href')));
            }
        });
        return animes;
    } catch (error) {
        console.log(error);
    }
    return null;
}

console.log(await getAnime('https://monoschinos2.com/anime/mou-ippon-sub-espanol'))

export default { getLastEpisodes, getLastAnimes };