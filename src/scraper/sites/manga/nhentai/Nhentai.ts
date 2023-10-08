import axios from 'axios';
import { load } from 'cheerio';
import { getFilterByPages } from './assets/getFilterByPage';
import { IMangaChapter, Manga } from '../../../../types/manga';

export class Nhentai {

  async filter(mangaName: string) {
    return new NhentaiFilter().filter(mangaName);
  }

  async  getMangaInfo(mangaId: string) {
    return new NhentaiMangaInfo().getMangaInfoById(mangaId);
  }

  async getMangaChapters(mangaId: string) {
    return new NhentaiGetMangaChapters().getMangaChapters(mangaId);
  }

}


class NhentaiFilter {

   url = "https://nhentai.net/search/?q=";

  async filter(mangaName: string) {

    let { data } = await axios.get(`${this.url}${mangaName}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "cf_clearance=OHpFETxuREFby8P5PzR6Y.U7eV_Jn8k3vv5yzgxtE0M-1695396631-0-1-90c4990c.fb5d1ea4.c7c5c6ec-250.0.0; csrftoken=udqNql3j2e67HZ7RXbL92kQICvon3P4Hq5V3RmHUqXoJSBBOzSGer4T5Em8x74M5"
      }
    });
    let $ = load(data);

    let numPages = $("section.pagination a").length;

    if (numPages != 0) {
      numPages = numPages - 2;
    }else {
      numPages = 1;
    }

    let getResults = await getFilterByPages(mangaName, numPages);

    return getResults;
  }


}



class NhentaiMangaInfo {


  async getMangaInfoById(mangaId: string) {

  try {


   let { data } = await axios.get(`https://nhentai.net/g/${mangaId}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      "Connection": "keep-alive",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": "cf_clearance=OHpFETxuREFby8P5PzR6Y.U7eV_Jn8k3vv5yzgxtE0M-1695396631-0-1-90c4990c.fb5d1ea4.c7c5c6ec-250.0.0; csrftoken=udqNql3j2e67HZ7RXbL92kQICvon3P4Hq5V3RmHUqXoJSBBOzSGer4T5Em8x74M5"
    }
  });

    let manga = new Manga();

    manga.characters = [];
    manga.authors = [];
    manga.chapters = [];

    let $ = load(data);

    manga.title = $("div#info h1").text();
    manga.thumbnail = {
      url: $("div#cover a img").attr('src')
    };

    manga.id = mangaId;
    manga.isNSFW = true;

    const chracters = $("section#tags .tag-container").get(1);
    const autors = $("section#tags .tag-container").get(3);

    $(autors).find("span a span.name").each((_, elementCheerio) => {
        manga.authors.push($(elementCheerio).text())
    })

    $(chracters).find("span a span.name").each((_, elementCheerio) => {
      manga.characters.push($(elementCheerio).text())
    });

    return manga

    }catch(error) {
      return error
    }

  }
}


class NhentaiGetMangaChapters {

  async getMangaChapters(mangaId: string) {

  try {

   let { data } = await axios.get(`https://nhentai.net/g/${mangaId}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      "Connection": "keep-alive",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": "cf_clearance=OHpFETxuREFby8P5PzR6Y.U7eV_Jn8k3vv5yzgxtE0M-1695396631-0-1-90c4990c.fb5d1ea4.c7c5c6ec-250.0.0; csrftoken=udqNql3j2e67HZ7RXbL92kQICvon3P4Hq5V3RmHUqXoJSBBOzSGer4T5Em8x74M5"
    }
   });

      let $ = load(data);

    let mangaChapters: IMangaChapter[] = [];

    let mangaImagesPages: string[] = [];

    $("div#thumbnail-container .thumb-container a img ").each((_, chapterImage) => {
      mangaImagesPages.push(
        $(chapterImage).attr("data-src")
      )
    })

      mangaChapters.push({
        title: "it doesn't",
        number: 1,
        cover: "it doesn't",
        url: "/manga/nhentai/chapter/1",
        id: 1,
        images: mangaImagesPages
      })


      return mangaChapters;

    } catch (error) {
      return error
    }

  }

}

(async () => {
  let nhentai = new NhentaiGetMangaChapters();
  let result_filter = await nhentai.getMangaChapters("418403");
  console.log(result_filter)
})()