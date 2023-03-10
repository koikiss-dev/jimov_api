import axios from "axios";
import * as cheerio from "cheerio";
import { Chapter, ChapterView, Manga } from "../../../../utils/manga/schemaProviders.js";
import { Image } from "../../../../utils/schemaProviders.js";

export const TMOManga = {
    url: 'https://tmomanga.com'
};

/**
 * 
 * @param {string} url 
 * @returns {Chapter}
 */
async function getChapter(url) {
    const $        = cheerio.load((await axios.get(url)).data);
    let chapter    = new Chapter();

    chapter.title  = $('h1#chapter-heading').text().trim();
    chapter.url    = url;
    chapter.number = parseInt($('li.active').text().trim().split(' ').pop());
    chapter.images = $('div#images_chapter img').map((i, el) => {
        if (i === 0)
            chapter.cover = $(el).attr('data-src');
        return $(el).attr('data-src');
    }).toArray();
    return chapter;
}

/**
 * 
 * @param {string} url 
 * @returns {Manga}
 */
async function getManga(url) {
    const $        = cheerio.load((await axios.get(url)).data);
    const data     = $('div.post-content-data div.post-content_item');

    let manga      = new Manga();
    manga.title    = $('div.post-title h1').text();
    manga.url      = url;
    manga.image    = new Image($('div.summary_image img').attr('src'), null);
    manga.synopsis = $('div.description-summary p').text().trim();
    manga.year     = $(data.get(0)).find('div.summary-content').text().trim();
    manga.genres   = $(data.get(1)).find('a').map((i, el) => { return $(el).text().trim() }).toArray();
    manga.chapters = $('ul.sub-chap li').children().map((i, el) => { return $(el).attr('href') }).toArray();
    return manga;
}

/**
 * 
 * @param {*} element 
 * @returns {ChapterView}
 */
function getChapterView(element) {
    let view   = new ChapterView();
    view.title = element.find('span.manga-title-updated').text().trim() + ' - ' +
                 element.find('span.manga-episode-title').text().trim();
    view.url   = element.find('a').attr('href');
    view.image = element.find('img').attr('src');
    view.manga = view.url.substring(0, view.url.lastIndexOf('-')).replace('capitulo', 'manga');
    return view;
}

/**
 * @param {number} number
 * @returns {(Manga[] | ChapterView[])}
 */
async function getSectionContent(number) {
    try {
        let content = [];
        const $ = cheerio.load((await axios.get(TMOManga.url)).data);
        const elements = $($('div.main-col-inner').get(number)).find('div.row').children();
        for (let i = 0; i < elements.length; i++) {
            content.push(number == 1 ? await getManga($(elements[i]).find('h3 a').attr('href')) : 
                getChapterView($(elements[i])));
        }
        return content;
    } catch (error) {
        console.log(error);
    }
    return [];
}

/**
 * 
 * @returns {Manga[]}
 */
async function getLastMangas() {
    return await getSectionContent(1);
}

/**
 * 
 * @returns {ChapterView[]}
 */
async function getLastChapters() {
    return await getSectionContent(0);
}

//console.log(await getChapter('https://tmomanga.com/capitulo/soredemo-ayumu-wa-yosetekuru-187.00'));

export default 
{ 
    getLastMangas, 
    getLastChapters, 
    getManga, 
    getChapter
}