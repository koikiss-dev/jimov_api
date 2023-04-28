import * as dotenv from "dotenv";
import * as ch from "cheerio";
import axios from "axios";
import pretty from "pretty";
import puppeteer from "puppeteer";
dotenv.config();

const url = "https://manga-oni.com";

async function getMangaCaps(link_page) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}${link_page}/p1`, { waitUntil: 'networkidle2' });
    const image = await page.$('#m_img');
    const src = await page.evaluate(img => img.getAttribute('src'), image);
    const pages = [src];
    await browser.close();
    /* const { data } = await axios.get(`${url}${link_page}/p1`, {timeout: 3000});
    const $ = ch.load(data);
    const info_pages = $("div#slider img").each((i, e) => {
      const images = { img: "", index: "" };
      images.img = $(e).attr("src");
      images.index = i
      pages.push(images);
    });
    return pretty(data) ; */
    return pages
  } catch (error) {
    return error;
  }
}

getMangaCaps('/lector/blue-lock/134124').then(f => {
    console.log(f)
})
