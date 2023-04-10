import { load } from "cheerio";
import puppeteer from "puppeteer";


async function getAnimeServer(name) {


  const animeName = name?.toLowerCase().replace(/\s/g, "-");

  try {



    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www1.otakustv.com/anime/bocchi-the-rock/episodio-1");
    const html = await page.content();


    const $ = load(html);

    console.log($.html());









  } catch (error) {
    return error
  }
}

getAnimeServer()


export default { getAnimeServer }
