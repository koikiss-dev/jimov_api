import { unpack } from "unpacker";
import * as cheerio from "cheerio";
//import chromium from '@sparticuz/chromium';
//import puppeteer from 'puppeteer-core';

//Spanish Providers - TypeScript version

interface IPageInfo {
    name: string
    url: string, // url page
    server: string,
    domain: string
}

//================== API functions ==================

export const api = {
    /**
     * Replaces the original URL with the API URL
     * 
     * @param info 
     * @param url 
     * @returns 
     */
    getEpisodeURL(info: IPageInfo, url: string): string {
        return url.replace(`https://${info.domain}/ver/`, `/anime/${info.name}/episode/`);
    },

    /**
     * Replaces the original URL with the API URL
     * 
     * @param info 
     * @param url 
     * @returns 
     */
    getAnimeURL(info: IPageInfo, url: string): string {
        return url.replace(`https://${info.domain}/anime/`, `/anime/${info.name}/name/`);
    }
}

//===================================================

export const utils = {
    /**
     * 
     * @param object 
     * @returns 
     */
    isUsableValue(object: any): boolean {
        return object != null && object != undefined;
    }
}


/**
 * 
 * @param packedString in Base64
 * 
 */

export const UnPacked = (packedString: string) => {
    let valuePacked: string;

    if (typeof atob === "undefined") {
        valuePacked = Buffer.from(packedString, "base64").toString("binary");
    } else {
        valuePacked = atob(packedString);
    }
    return unpack(valuePacked);
}

/**
 * 
 * @param data in Base64
 * 
 */
export const RuntimeUnpacked = async(data:string) => {
    const content = Buffer.from(data, 'base64').toString()
    const $ = cheerio.load(content)
    const Buffers = $("script").get().at(-1).children[0].data
    const UnBuffer = UnPacked(Buffer.from(Buffers).toString('base64'))
    const RequestBR = await eval(UnBuffer.slice(UnBuffer.indexOf("{sources:[{file:") + "{sources:[{file:".length, UnBuffer.indexOf("}],image:", 1)));

    return RequestBR
}


/**
 * 
 * @param firstpage the name says it
 * 
 */
/* Working for new method
export const BrowserHandler = async(firstpage:string) => {

    const browser = await puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        headless: true,
        executablePath: await chromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar"),
        ignoreDefaultArgs: ["--disable-extensions"],
      })
      const page = await browser.newPage()

      
      await page.goto(firstpage)
     
      
      return {page,browser}
}*/
