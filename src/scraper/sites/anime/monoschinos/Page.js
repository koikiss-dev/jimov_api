import axios from "axios";
import * as cheerio from "cheerio";
import { Episode } from "../../../../utils/episode";

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
                episodes.push(new Episode = {
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
 * @param {*} url 
 * @returns 
 */
async function getAnimeInfo(url) {
    let animes = [];
    const $ = cheerio.load((await axios.get(url)).data);
    return {
        name: $('div.chapterdetails').find('h1').text(),
        url: url,
        description: $('div.chapterdetails p.textComplete').text().trim(),
        image: {
            banner: $('div.herobg img').attr('src'),
            url: $('div.chapterpic img').attr('src')
        }
    };
}

/**
 * 
 * @returns 
 */
async function getLastAnimes() {
    try {
        let animes = [];
        const $ = cheerio.load((await axios.get(`${ PageInfo.url }/emision`)).data);
        $('div.heroarea div.heromain div.row').children().each(async (i, element) => {
            if ($(element).find('a').attr('title') != undefined) {
                animes.push(getAnimeInfo($(element).find('a').attr('href')));
            }
        });
        return animes;
    } catch (error) {
        console.log(error);
    }
    return null;
}

await getLastAnimes()

export default { getLastEpisodes, getLastAnimes };