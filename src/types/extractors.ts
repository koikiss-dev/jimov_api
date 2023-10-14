//import * as cheerio from "cheerio";
import axios from "axios";
//import { UnPacked } from "./utils";
import { webkit } from 'playwright';

/**
 * 
 * @param url URL to Request data
 * @example await filemoon("https://filemoon.sx/e/5ehdd8cohg8r")
 * @description List of domains [filemoon.sx]
 * 
 * RequestBR Preload url needed by the request with cookies
 */


axios.defaults.withCredentials = true
export const filemoon = async (_url: string) => {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto('https://filemoon.sx/e/irin5v8w3kxe');


    await browser.close();
    return await page.content()
}

