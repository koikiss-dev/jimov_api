import axios from "axios";
import * as ch from 'cheerio';


async function getAnime() {
  try {

    const { data } = await axios.get("https://tioanime.com/");
    const $ = ch.load(data);
    $('div.container section ul.episodes li').each((i, element) => {
      console.log($(element).html());
    });

  } catch (error) {
    return error
  }
}


getAnime()
