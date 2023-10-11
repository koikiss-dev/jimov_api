import { IMangaResult } from "@animetypes/manga";
import axios from "axios";
import { load } from "cheerio";

export async function getFilterByPages(
  mangaName: string,
  numPage: number,
): Promise<IMangaResult[]> {
  const searchResults: IMangaResult[] = [];

  for (let index = 1; index <= numPage; index++) {
    const { data } = await axios.get(
      `https://nhentai.to/search?q=${mangaName}&page=${index}`,
    );

    const $ = load(data);

    $(".container .gallery a").each((_, elementCheerio) => {
      const id = $(elementCheerio).attr("href").split("/")[2];
      const title = $(elementCheerio).find(".caption").text();
      const coverImg = $(elementCheerio).find("img").attr("src");

      searchResults.push({
        id: id,
        title: title,
        url: `/manga/nhentai/title/${id}`,
        thumbnail: {
          url: coverImg,
        },
      });
    });
  }

  return searchResults;
}
