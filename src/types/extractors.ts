import * as cheerio from "cheerio";
import axios from "axios";
import { UnPacked } from "./utils";

/**
 * 
 * @param url URL to Request data
 * @example await filemoon("https://filemoon.sx/e/5ehdd8cohg8r")
 * @description List of domains [filemoon.sx]
 * 
 * RequestBR Preload url needed by the request with cookies
 */

fetch("https://filemoon.sx/e/5ehdd8cohg8r", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
axios.defaults.withCredentials = true
export const filemoon = async (_url: string) => {

        const Request = await axios.get("https://filemoon.sx/e/5ehdd8cohg8r")
        const $ = cheerio.load(Request.data)

        const Buffer = btoa($("script").get().at(-1).children[0].data)
        const UnBuffer = UnPacked(Buffer)

        //const RequestBR = await eval(UnBuffer.slice(UnBuffer.indexOf("{sources:[{file:") + "{sources:[{file:".length, UnBuffer.indexOf("}],image:", 1)));
        //await axios.get(RequestBR,{headers:{"Accept":"*/*","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55"}})
        return UnBuffer

}

