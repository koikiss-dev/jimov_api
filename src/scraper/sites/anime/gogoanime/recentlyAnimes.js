import axios from 'axios';
import * as ch from 'cheerio';


async function getPopular() {
  try {

    const { data } = await axios.get(`https://ww4.gogoanimes.org/`);
    const $ = ch.load(data);

    const popularAnimeUrlAndName = [];

    const addAnime = $("div.added_series_body ul li  ").each((i, j) => {
      popularAnimeUrlAndName.push({
        title: $(j).find("a").text().trim(),
        link: `https://ww4.gogoanimes.org${$(j).find("a").attr('href')}`,
      });
    });

    return popularAnimeUrlAndName;


  } catch (error) {
    return error;
  }
}


export default { getPopular }
