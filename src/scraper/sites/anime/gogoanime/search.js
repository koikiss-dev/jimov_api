import axios from "axios";
import { load } from 'cheerio';
import { AnimeSearch, SearchArray } from '../../../../utils/schemaProviders.js'

async function Search(name = 'Action', numPages = 1) {

  //Testing param numPages isn't 1, it back main page :3
  const url = numPages == 1
    ? `https://ww4.gogoanimes.org/genre/${name}`
    : `https://ww4.gogoanimes.org/genre/${name}?page=${numPages}`

  try {

    const { data } = await axios.get(`${url}`);
    const $ = load(data);

    const animes = new SearchArray(numPages); 




    //Pushing animes in the array
    $('.last_episodes .items li').each((i, element) => {
      animes.data.push(new AnimeSearch(
        //name
        $(element).find('p').find('a').text().trim(),
        //image/cover
        $(element).find('.img').find('a').find('img').attr('src'),
        //url
        'https://ww4.gogoanimes.org' + $(element).find('a').attr('href')
      ))
    })


    return animes

  } catch (error) {
    return error
  }
}


