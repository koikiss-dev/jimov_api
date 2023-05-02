import axios from 'axios';
import { load } from 'cheerio';
import { getFilterByPages } from './assets/getFilterByPage';


export class NhentaiFilter {

   url = "https://nhentai.to/search?q=";

  async Filter(mangaName: string) {

    let { data } = await axios.get(`${this.url}${mangaName}`);

    let $ = load(data);

    let numPages = $("section.pagination a").length;

    numPages = numPages - 2;

    let getResults = await getFilterByPages(mangaName, numPages);

    return getResults;
  }
}



