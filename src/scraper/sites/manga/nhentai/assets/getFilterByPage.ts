import { IMangaResult } from "@animetypes/manga";
import axios from "axios";
import { load } from "cheerio";

export async function getFilterByPages(mangaName: string, numPage: number) {


  let searchResults: IMangaResult[] = [];

  for (let index = 1; index <= numPage ; index++) {

    let { data } = await axios.get(`https://nhentai.to/search?q=${mangaName}&page=${index}`);

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
