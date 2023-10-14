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

export const filemoon = async (url: string, callback: (arg0: unknown, arg1: undefined) => void) => {
    try {
        const Request = await axios.get(url)
        const $ = cheerio.load(Request.data)

        const Buffer = btoa($("script").get().at(-1).children[0].data)
        const UnBuffer = UnPacked(Buffer)

        const RequestBR = await eval(UnBuffer.slice(UnBuffer.indexOf("{sources:[{file:") + "{sources:[{file:".length, UnBuffer.indexOf("}],image:", 1)));
        axios.get(RequestBR)
        callback(null,RequestBR)
    } catch (error) {
        callback(error,undefined)
    }
}

