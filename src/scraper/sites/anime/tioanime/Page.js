import axios from "axios";
import * as cheerio from "cheerio";

const TioAnimeInfo = {
    url: 'https://tioanime.com' // url page
}

/**
 * finished!
 */
async function getLastAnimes() {
    try {
        let animes = [];
        const $ = cheerio.load((await axios.get(TioAnimeInfo.url)).data);
        $('div.container section ul.list-unstyled.row li').each((i, element) => {
            animes.push({
                name:  $(element).find('h3.title').text().trim(),
                image: $(element).find('figure.fa-play-circle img').attr('src'),
                url:   $(element).find('article.anime a').attr('href')
            });
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
                episode: parseInt(title.substring(i + 1, title.length)) 
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
        const $ = cheerio.load((await axios.get(TioAnimeInfo.url)).data);
        $('div.container section ul.episodes li').each((i, element) => {
            const episode = getEpisodeInfo($(element).find('h3.title').text().trim());
            episodes.push({
                name:    episode.name,
                image:   $(element).find('figure.fa-play-circle img').attr('src'),
                url:     $(element).find('article.episode a').attr('href'),
                episode: episode.episode
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
        const $ = cheerio.load((await axios.get(TioAnimeInfo.url)).data);
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

export default { getLastEpisodes, getLastAnimes, getLastMovies, getLastOvas, getLastOnas };
