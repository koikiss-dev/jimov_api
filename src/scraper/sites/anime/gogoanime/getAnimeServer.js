import axios from 'axios';
import { load } from 'cheerio';
import puppeteer from 'puppeteer';
import { Episode } from '../../../../utils/schemaProviders';

async function getAnimeServer(animeName, numberEpisode) {

  try {

    const episodes = new Episode();


    numberEpisode = numberEpisode.toString();
    animeName = animeName.replace(/\s/g, "-").toLowerCase();

    const url = `https://ww4.gogoanimes.org/watch/${animeName}-episode-${numberEpisode}`


    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${url}`);
    await page.waitForSelector("iframe");

    const html = await page.content();


    const $ = load(html);


    $("iframe").each((index, element) => {
      episode.servers.push($(element).attr('src'))
    })

    await browser.close()

    return episodes;



  } catch (error) {
    return error
  }

}

getAnimeServer("bocchi the rock", 3)


export default { getAnimeServer }

