
import axios from "axios";
import * as ch from "cheerio";


const url_zoro = 'https://zoro.to';

/*anime featured */
async function AnimeFeatured(url, page) {
  const error_page = [
    {
      error: "Invalid or incompleted param",
      valids_params: ['top-airing', 'most-popular', 'most-favorite', 'completed'],
      code: 404,
      value: false,
    },
  ];
  try {
    const { data } = await axios.get(`${url_zoro}/${url}`, {
      params: {
        page: page,
      },
    }); //top-airing, most-popular, most-favorite, completed
    const $ = ch.load(data);
    const airing_cards = $(
      "div.tab-content div.film_list div.film_list-wrap div.flw-item"
    );
    const data_return = [{ page: page || 1 }];

    airing_cards.each((i, e) => {
      const data_anime = {
        title: "",
        episode_number: "",
        type: "",
        img: "",
        link: "",
      };
      data_anime.title = $(e).find("a.dynamic-name").text().trim();
      data_anime.episode_number = $(e).find("div.tick-eps").text().trim();
      data_anime.type = $(e)
        .find("div.fd-infor")
        .children()
        .first()
        .text()
        .trim();
      data_anime.img = $(e)
        .find("div.film-poster")
        .find("img.film-poster-img")
        .attr("data-src");
      data_anime.link = $(e).find("a.dynamic-name").attr("href");
      data_return.push(data_anime);
    });
    return data_return;
  } catch (error) {
    return error_page;
  }
}
/*anime featured */
/*params: {
  url: [top-airing, most-popular, most-favorite, completed] <-- en una sola función
} */


export default {
  AnimeFeatured,
};
