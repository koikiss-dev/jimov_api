import { IMangaResult } from "@animetypes/manga";
import axios from "axios";
import { load } from "cheerio";

export async function getFilterByPages(mangaName: string, numPage: number) {


  let searchResults: IMangaResult[] = [];

  for (let index = 1; index <= numPage ; index++) {

    let { data } = await axios.get(`https://nhentai.net/search/?q=${mangaName}&page=${index}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "cf_clearance=OHpFETxuREFby8P5PzR6Y.U7eV_Jn8k3vv5yzgxtE0M-1695396631-0-1-90c4990c.fb5d1ea4.c7c5c6ec-250.0.0; csrftoken=udqNql3j2e67HZ7RXbL92kQICvon3P4Hq5V3RmHUqXoJSBBOzSGer4T5Em8x74M5"
      }
    });

    let $ = load(data);

    $(".container .gallery a").each((_, elementCheerio) => {
          let id = $(elementCheerio).attr("href").split("/")[2];
          let title =  $(elementCheerio).find(".caption").text();
          let coverImg =  $(elementCheerio).find("img").attr("src");

            searchResults.push({
              id: id,
              title: title,
              url: `/manga/nhentai/title/${id}`,
              thumbnail: {
                url: coverImg
              }
            })
        })
  }

  return searchResults;

}
