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

export const filemoon = async (url: string) => {
    try {
        const Request = await axios.get(url,{headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55"}})
        const $ = cheerio.load(Request.data)

        const Buffer = btoa($("script").get().at(-1).children[0].data)
        const UnBuffer = UnPacked(Buffer)

        const RequestBR = await eval(UnBuffer.slice(UnBuffer.indexOf("{sources:[{file:") + "{sources:[{file:".length, UnBuffer.indexOf("}],image:", 1)));
        axios.get(RequestBR)
        return RequestBR
    } catch (error) {
        return error
    }
}

