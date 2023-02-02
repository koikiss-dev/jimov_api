import axios from "axios";
import * as cheerio from "cheerio";

const PageInfo = {
    url: 'https://tioanime.com' // url page
}

/**
 * 
 * @param {*} params 
 */
async function getVideoServers(url) {
    'use strict'
    const $ = cheerio.load((await axios.get(PageInfo.url + url)).data);

    const scripts    = $('script').get();
    const script     = $(scripts[scripts.length - 1]).text().trim();
    const script_src = script.substring(0, script.indexOf('$(document)'));

    eval?.(script_src);
    eval(script_src);
    return globalThis.videos;
}

/**
 * 
 * @param {*} $ 
 */
function getAnimeChronology($) {
    let chrono_list = [];
    $('section.w-history ul.list-unstyled li').each((i, element) => {
        chrono_list.push({
            name:  $(element).find('h3.title').text(),
            image: PageInfo.url + $(element).find('figure.fa-play-circle img').attr('src'),
            url:   PageInfo.url + $(element).find('div.media-body a').attr('href'),
            year:  $(element).find('div.meta span.year').text().substring(0, 4),
            type:  $(element).find('div.thumb span.anime-type-peli').text()
        });
    });
    return chrono_list;
}

/**
 * 
 * @param {*} url 
 */
async function getAnimeInfo(url) {
    const $ = cheerio.load((await axios.get(PageInfo.url + url)).data);

    const scripts    = $('script').get();
    const script     = $(scripts[scripts.length - 1]).text().trim();
    const script_src = script.substring(0, script.indexOf('$(document)'));

    let execute = function (code) {
        'use strict'
        eval?.(code);
        eval(code);

        return {
            // get variables by script source code
            _anime_info: globalThis.anime_info,
            _episodes: globalThis.episodes
        };
    };

    const result = execute(script_src);
    let episodes = [];

    result._episodes.forEach(/* number */ element => {
        episodes.push({
            name:   result._anime_info[2],
            image: `${ PageInfo.url }/uploads/thumbs/${ result._anime_info[0] }.jpg`,
            url:   `${ PageInfo.url }/ver/${ result._anime_info[1] }-${ element }`
        });
    });

   return {
        name:        $('div.container h1.title').text(),
        image:       PageInfo.url + $('div.container div.thumb figure img').attr('src'),
        url:         PageInfo.url + url,
        description: $('div.container p.sinopsis').text().trim(),
        genres:      getAnimeGenres($, $('div.container p.genres span')),
        year:        $('div.meta span.year').text().substring(0, 4),
        type:        $('div.meta span.anime-type-peli').text(),
        season:      $('div.meta span.fa-snowflake').text().split('\n')[0],
        episodes:    episodes,
        active:      $('div.thumb a.status').text() === 'En emision',
        chronology:  getAnimeChronology($)
    };
}

/**
 * finished!
 */
async function getLastAnimes() {
    try {
        let animes = [];
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
        $('div.container section ul.list-unstyled.row li').each(async (i, element) => {
            const anime_url = $(element).find('article.anime a').attr('href');
            if (anime_url != undefined) {
                animes.push(await getAnimeInfo(anime_url));
            }
        });
        return animes;
    } catch (error) {
        console.log(error);
    }
    return null;
}

/**
 * 
 * @param {*} title 
 * @returns 
 */
function getEpisodeInfo(title) {
    for (let i = title.length - 1; i >= 0; i--) {
        if (title[i] == ' ') {
            return { 
                name: title.substring(0, i).trim(),  
                episode: parseInt(title.substring(i + 1, title.length)),
            };
        }
    }
    return null;
}

/**
 * 
 * @returns 
 */
async function getLastEpisodes() {
    try {
        let episodes = [];
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
        $('div.container section ul.episodes li').each(async (i, element) => {
            const episode = getEpisodeInfo($(element).find('h3.title').text().trim());
            const url_episode = $(element).find('article.episode a').attr('href');
            episodes.push({
                name:    episode.name,
                image:   $(element).find('figure.fa-play-circle img').attr('src'),
                url:     url_episode,
                episode: episode.episode,
                video:   await getVideoServers(url_episode)
            });
            console.log(episodes[episodes.length - 1]);
        });
        return episodes;
    } catch (error) {
        console.log(error);
    }
    return null;
}

/**
 * 
 * @param {*} $ 
 * @param {*} elements 
 */
function getAnimeGenres($, elements) {
    let genres = [];
    elements.each((i, element) => {
        genres.push($(element).find('a').text().trim());
    });
    return genres;
}

/**
 * 
 * @param {*} section movies, ovas and onas
 * @returns 
 */
async function getSectionContents(section) {
    try {
        let contents = [];
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
        $(`div.container div.latest section.${ section } ul.list-unstyled li`).each((i, element) => {
            contents.push({
                name:        $(element).find('h3.title').text().trim(),
                image:       $(element).find('figure.fa-play-circle img').attr('src'),
                url:         $(element).find('article.anime a').attr('href'),
                description: $(element).find('p.description').text().trim(),
                genres:      getAnimeGenres($, $(element).find('p.genres span'))
            });
        });
        return contents;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getLastMovies() {
    return await getSectionContents('movies');
}

async function getLastOvas() {
    return await getSectionContents('ovas');
}

async function getLastOnas() {
    return await getSectionContents('onas');
}

await getLastEpisodes();

export default { getLastEpisodes, getLastAnimes, getLastMovies, getLastOvas, getLastOnas };
