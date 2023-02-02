import * as ch from "cheerio";
import axios from 'axios';


async function getRandom() {
  try {
    

    const abecedary = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    const getNumber = Math.floor(Math.random() * 10) - 1;
    const letter = abecedary[getNumber];
    const { data } = await axios.get(`https://ww4.gogoanimes.org/anime-list-${letter}`)

    const $ = ch.load(data);

    const pagesFromPage = [];

    const getPages = $("div.pagination ul li a").each((i, j) => {
      pagesFromPage.push($(j).html())
    });

    const getIndexPages = Math.floor(Math.random() * (pagesFromPage.length - 1 + 1)) + 1;


    const urlForFetch = `https://ww4.gogoanimes.org/anime-list-${letter}?page=${pagesFromPage[getIndexPages - 1]}`;

    

    return urlForFetch;


  } catch (error) {
    return error;
  }
}

export default { getRandom }

