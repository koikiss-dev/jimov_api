import axios from "axios";
import * as cheerio from "cheerio";
import { api, utils } from "../../../../types/utils";
import * as types from "../../../../types/.";
import { ResultSearch, IResultSearch, IAnimeSearch } from "../../../../types/search";

const PageInfo = {
    name: 'monoschinos',
    url: 'https://monoschinos2.com', // url page
    server: 'monoschinos2',
    domain: 'monoschinos2.com'
}

/**
 * This function returns a list of servers where the episode is located.
 * The URLs of the servers are Base64 encoded.
 * 
 * @param url
 * @returns
 */
async function getEpisodeServers(url: string): Promise<types.EpisodeServer[]> {
    let servers: types.EpisodeServer[] = [];
    const $ = cheerio.load((await axios.get(url)).data);
    $('div.playother').children().each((_i, element) => {
		servers.push(new types.EpisodeServer($(element).text().trim(), 
            Buffer.from($(element).attr('data-player'), 'base64').toString('binary'))
        );
    });
    return servers;
}

/**
 * 
 * @param $ 
 * @param element 
 * @returns 
 */
async function getEpisodeByElement($, element): Promise<types.Episode> {
	const episode  = new types.Episode();
    episode.number = parseInt($(element).find('div.positioning p').text().trim());
    episode.image  = $(element).find('div.animeimgdiv img.animeimghv').attr('data-src');
    episode.name   = $(element).find('h2.animetitles').text().trim();
    episode.url    = api.getEpisodeURL(PageInfo, $(element).find('a').attr('href'));
	return episode;
}

/**
 * 
 * @throws {Error}
 * @returns 
 */
async function getLastEpisodes(): Promise<types.Episode[]> {
    let episodes: types.Episode[] = [];
    const $ = cheerio.load((await axios.get(PageInfo.url)).data);
    const elements = $('div.heroarea div.heroarea1 div.row').children();
    for (let i = 0; i < elements.length; i++) {
        if ($(elements[i]).children().length != 0) {
            episodes.push(await getEpisodeByElement($, elements[i]));
        }
    }
    return episodes;
}

/**
 * 
 * @param $ 
 * @returns 
 */
function getGenres($): string[] {
    let genres: string[] = [];
    $('div.chapterdetls2 table tbody a').each((_i, element) => {
        genres.push($(element).text().trim())
    });
    return genres;
}

/**
 * 
 * @param $ 
 * @returns 
 */
function getAnimeEpisodes($): types.Episode[] {
	let episodes: types.Episode[] = [];
	$('div.heromain2 div.allanimes div.row').children().each((_i, element) => {
        const episode  = new types.Episode();
        episode.number = parseInt($(element).attr('data-episode').trim());
        episode.image  = $(element).find('img.animeimghv').attr('data-src');
        episode.name   = $(element).find('img.animeimghv').attr('alt');
        episode.url    = api.getEpisodeURL(PageInfo, $(element).find('a').attr('href'));
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

interface ClimaticCalendar {
    year: number;
    station: null | string;
}

/**
 * The calendar of the anime is extracted. The format shown on the 
 * website is 'dd from mm from yyyy'.
 * 
 * @param element 
 * @returns the calendar of anime
 */
function getAnimeCalendar(element): ClimaticCalendar {
    const date  = element.find('ol.breadcrumb li.breadcrumb-item').text().trim().split(' ');
    if (date.length != 5)
        return { year: 0, station: null };
    else {
        for (let i = 0; i < calendar.length; i++) {
            if (calendar[i][0].includes(date[2].toLowerCase())) {
                return { year: parseInt(date.pop()), station: calendar[i][1].toString() };
            }
        }
    }
}

/**
 * 
 * @param url 
 * @returns 
 */
async function getAnime(url: string): Promise<types.Anime> {
	// The anime page in monoschinos does not define the chronology and type
    const $        = cheerio.load((await axios.get(url)).data);
    const calendar = getAnimeCalendar($($('div.chapterdetails nav').children()[1]));
    const anime    = new types.Anime();
    anime.name     = $('div.chapterdetails').find('h1').text();
	anime.alt_name = $('div.chapterdetails').find('span.alterno').text();
    anime.url      = api.getAnimeURL(PageInfo, url);
    anime.synopsis = $('div.chapterdetls2 p').text().trim();
    anime.genres   = getGenres($);
    anime.image    = new types.Image($('div.chapterpic img').attr('src'), $('div.herobg img').attr('src'));
    anime.status   = 'estreno' === $('div.butns button.btn1').text().toLowerCase().trim();
	anime.episodes = getAnimeEpisodes($);
    anime.date     = new types.Calendar(calendar.year);
    anime.station  = calendar.station;
    return anime;
}

/**
 * 
 * @throws {Error}
 * @param url 
 * @returns 
 */
async function getLastAnimes(url?: string): Promise<types.Anime[]> {
    let animes: types.Anime[] = [];
    const $ = cheerio.load((await axios.get(url ?? `${PageInfo.url}/emision`)).data);
    const elements = $('div.heroarea div.heromain div.row').children();
    for (let i = 0; i < elements.length; i++) {
        const href = $(elements[i]).find('a').attr('href');
        if (utils.isUsableValue(href) && href !== 'https://monoschinos2.com/emision?p=2') {
            animes.push(await getAnime(href));
        }
    }
    return animes;
}

//console.log(await getLastAnimes('https://monoschinos2.com/animes?categoria=anime&genero=accion&fecha=2023&letra=A'));

//console.log(await getLastAnimes())

/**
 * 
 * 
 * @author Zukaritasu
 */
export class Monoschinos 
{ 
    getLastEpisodes = getLastEpisodes;
    getLastAnimes = getLastEpisodes;
    getEpisodeServers = getEpisodeServers;
    getAnime = getAnime;

    async filter(name: (string | null), category?: string, genre?: string, year?: string, letter?: string): Promise<IResultSearch<IAnimeSearch>> {
        const animes = new ResultSearch<IAnimeSearch>();
        const link = utils.isUsableValue(name) ? `${PageInfo.url}/buscar?q=${name}` : 
            `${PageInfo.url}/animes?categoria=${category ?? false}&genero=${genre ?? false}&fecha=${year ?? false}&letra=${letter ?? false}`;
        (await getLastAnimes(link))
            .forEach(element => {
                if (utils.isUsableValue(element)) {
                    animes.results.push({ name: element.name, image: element.image.url, 
                        url: element.url, type: category
                    });
                }
            });
        return animes;
    }
};


//console.log(await getAnime("https://monoschinos2.com/anime/world-dai-star-sub-espanol"));