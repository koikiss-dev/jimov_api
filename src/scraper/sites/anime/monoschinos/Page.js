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
 * {
 *      name:
 *      image:
 *      url:
 *      episode:
 *      video:
 * }
 */
async function getLastEpisodes() {
    try {
        let episodes = [];
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
        $('div.heroarea div.heroarea1 div.row').children().each(async (i, element) => {
            if ($(element).children().length != 0) {
                let anime = [ null ];
                episodes.push( {
                    name:    $(element).find('h2.animetitles').text().trim(),
                    image:   $(element).find('div.animeimgdiv img.animeimghv').attr('data-src'),
                    url:     $(element).find('a').attr('href'),
                    episode: $(element).find('div.positioning p').text().trim(),
                    video:   await getEpisodeServers($(element).find('a').attr('href'), anime),
                    anime:   anime[0]
                });
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
 * @param {string} url 
 * @returns {Anime}
 */
async function getAnime(url) {
    const $ = cheerio.load((await axios.get(url)).data);
    const anime    = new Anime();
    anime.name     = $('div.chapterdetails').find('h1').text();
    anime.url      = url;
    anime.synopsis = $('div.chapterdetls2 p').text().trim();
    anime.genres   = getGenres($);
    anime.image    = new Image($('div.chapterpic img').attr('src'), $('div.herobg img').attr('src'));
    anime.active   = 'estreno' === $('div.butns button.btn1').text().toLowerCase().trim()

    $('div.heromain2 div.allanimes div.row').children().each((i, element) => {
        const episode  = new Episode();
        episode.number = parseInt($(element).attr('data-episode').trim());
        episode.image  = $(element).find('img.animeimghv').attr('data-src');
        episode.name   = $(element).find('img.animeimghv').attr('alt');
        episode.url    = $(element).find('a').attr('href');
        anime.episodes.push(episode);
    });

    $('div.chapterdetails nav').children().each((i, element) => {
        if (i == 1) {
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
        let animes = [Anime];
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

console.log(await getAnime('https://monoschinos2.com/anime/maou-gakuin-no-futekigousha-shijou-saikyou-no-maou-no-shiso-tensei-shite-shison-tachi-no-gakkou-e-kayou-ii-sub-espanol'))

export default { getLastEpisodes, getLastAnimes };