//import * as cheerio from "cheerio";
import axios from "axios";
//import { UnPacked } from "./utils";

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

        //const Request = await axios.get("https://filemoon.sx/e/5ehdd8cohg8r")
        let headersList = {
          "User-Agent":"Mozilla/5.0 (Linux; Android 10; LM-K920) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36"
        }
        
        let response = await fetch("https://filemoon.sx/e/397bb6qxbwvh", { 
          method: "GET",
          credentials:"include",
          headers: headersList
        });
        
        let data = await response.text();
     
        console.log(btoa(data))
       // const $ = cheerio.load(data)

        //const Buffer = btoa($("script").get().at(-1).children[0].data)
        //const UnBuffer = UnPacked(Buffer)

        //const RequestBR = await eval(UnBuffer.slice(UnBuffer.indexOf("{sources:[{file:") + "{sources:[{file:".length, UnBuffer.indexOf("}],image:", 1)));
        //await axios.get(RequestBR,{headers:{"Accept":"*/*","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55"}})
        return data

}
