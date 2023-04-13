import { load } from 'cheerio';
import axios from 'axios';
import {  AnimeSearch, Image, SearchArray } from '../../../../utils/schemaProviders.js';


async function Search(name) {

  let url = `https://www1.otakustv.com/buscador?q=${name}`;

  try {

    const { data } = await axios.get(`${url}`);
    const $ = load(data);

    //the first page is all result about anime, it's doesn't have pagination
    const animes = new SearchArray(1);

    //Get all animes
    $('.animes_lista .row .col-6').each((i, element) => {
      animes.data.push(new AnimeSearch(
        $(element).find('p.font-GDSherpa-Bold').text(),
        new Image($(element).find('img').attr('src')),
        $(element).find('a').attr('href')
      ))
    })

    return animes

  } catch (error) {
    return error
  }

}

export default { Search } 

