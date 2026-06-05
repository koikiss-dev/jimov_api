import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { api, utils } from "../../../../types/utils";
import * as types from "../../../../types/.";
import { ResultSearch, IResultSearch, AnimeResult } from "../../../../types/search";

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
    const referenceElement = $('p.fs-5.text-light.my-4');
    const divElement = referenceElement.next('div.d-flex');
    
    if (divElement.length === 0) {
        throw new Error('The div following the reference element was not found');
    }

    divElement.find('a').each((_i, element) => {
        servers.push(new types.EpisodeServer($(element).text().trim(), 
            $(element).attr('href')
        ));
    });
    
    return servers;
}

/**
 * 
 * @param $ 
 * @param element 
 * @returns 
 */
function getEpisodeByElement($: cheerio.Root, element: cheerio.Element): types.Episode {
	const episode     = new types.Episode();
    episode.num       = parseInt($(element).find('span.episode').text().trim());
    episode.thumbnail = new types.Image($(element).find('img').attr('data-src'));
    episode.name      = $(element).find('h2').text();
    episode.url       = api.getEpisodeURL(PageInfo, $(element).find('a').attr('href'));
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
    $('ul.row.row-cols-xl-4.row-cols-lg-4.row-cols-md-3.row-cols-2').find('li').each((_i, element) => {
        episodes.push(getEpisodeByElement($, element));
    });
    return episodes;
}

/**
 * 
 * @param $ 
 * @returns 
 */
function getGenres($: cheerio.Root): string[] {
    let genres: string[] = [];
    $('div.tab-content div.tab-pane div.lh-lg a').each((_i, element) => {
        genres.push($(element).find('span').text().trim())
    });
    return genres;
}

/**
 * 
 * @param $ 
 * @param pageData 
 * @param animeName 
 * @returns 
 */
async function getAnimeEpisodes($: cheerio.Root, animeName: string, pageData: AxiosResponse<any, any>, animePath: string): Promise<types.Episode[]> {
    const response = await fetch($('.caplist').attr('data-ajax'), {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": pageData.headers['set-cookie'].join(";"),
        },
        "body": `_token=${$('meta[name="csrf-token"]').attr('content')}`,
        "method": "POST"
    })

	let episodes: types.Episode[] = [];

    const length = (await response.json()).eps.length
    const image = $('div img.lazy.w-100').attr('data-src')
    for (let i = 1; i <= length; i++) {
        const episode     = new types.Episode();
        episode.num       = i;
        episode.thumbnail = new types.Image(image);
        episode.name      = `${animeName} Episodio ${i}`;
        episode.url       = api.getEpisodeURL(PageInfo, `https://monoschinos2.com/ver/${animePath}-episodio-${i}`);
        episodes.push(episode);
    }
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
function getAnimeCalendar(strDate: string): ClimaticCalendar {
    const date = strDate.split(' ');
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
async function getAnime(url: string): Promise<types.AnimeMedia> {
	// The anime page in monoschinos does not define the chronology and type
    const pageData  = await axios.get(url);
    const $         = cheerio.load(pageData.data);

    const info      = $('div.tab-content div.bg-transparent dl').children();

    const calendar  = getAnimeCalendar($(info[3]).text().trim());
    const anime     = new types.AnimeMedia();
    anime.name      = $(info[5]).text()
    anime.alt_names = $(info[7]).text()
    anime.url       = api.getAnimeURL(PageInfo, url);
    anime.synopsis  = $('section.d-sm-none div.mt-3 p').text()
    anime.image     = new types.Image($('div img.bg-secondary').attr('data-src')) 
    anime.status    = $($('div.tab-content div.col-12.col-md-9 div.ms-2').children()[1]).text();
    anime.genres    = getGenres($);
    anime.date      = new types.Calendar(calendar.year);
    anime.station   = calendar.station;
    anime.episodes  = await getAnimeEpisodes($, anime.name, pageData, url.split('/').pop());
    return anime;
}

/**
 * If url is null then the function will return a list of the last anime
 * that were published, otherwise it refers to a url that contains a
 * search filtering that among them can be search by name or search by
 * category, genre and date
 * 
 * @param url web address with results filtering
 * @returns anime list
 */
async function getLastAnimes(url?: string): Promise<types.AnimeMedia[]> {
    let animes: types.AnimeMedia[] = [];
    const $ = cheerio.load((await axios.get(url ?? PageInfo.url)).data);

    const addElement = (element: cheerio.Element) => {
        let anime   = new types.AnimeMedia();
        anime.url   = api.getAnimeURL(PageInfo, $(element).find('a').attr('href'))
        anime.image = new types.Image($(element).find('img').attr('data-src'));
        anime.name  = $(element).find('h3').text().trim();
        animes.push(anime);
    }

    if (url === null) {
        $('ul.row.row-cols-2.row-cols-sm-3').find('li')
        .each((_i, element) => addElement(element));
    } else {
        $('ul.row').find('li')
        .each((_i, element) => addElement(element));
    }
    return animes;
}

/**
 * 
 * 
 * @author Zukaritasu
 */
export class Monoschinos 
{ 
    getLastEpisodes   = getLastEpisodes;
    getLastAnimes     = (() => getLastAnimes(null));
    getEpisodeServers = getEpisodeServers;
    getAnime          = getAnime;

    async filter(name: (string | null), category?: string, genre?: string, year?: string): Promise<IResultSearch<AnimeResult>> {
        const animes = new ResultSearch<AnimeResult>();
        const link = utils.isUsableValue(name) ? `${PageInfo.url}/buscar?q=${name}` : 
            `${PageInfo.url}/animes?categoria=${category ?? false}&genero=${genre ?? false}&fecha=${year ?? false}`;
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

/****************************** Test API ******************************/
/*new Monoschinos().filter(null, null, null, '2022').then(data => {
    console.log(data)
}).catch(error => console.log(error))*/
/*getAnime("https://monoschinos2.com/anime/one-room-hiatari-futsuu-tenshi-tsuki-sub-espanol").then(data => {
    console.log(data)
}).catch(error => console.log(error))*/