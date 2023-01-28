import * as dotenv from "dotenv";
import axios from "axios";
import * as ch from "cheerio";
dotenv.config();

const url_zoro = process.env.ZORO;

async function MostViewd(path) {
  const error_page = [
    {
      error: "Invalid or incompleted param",
      valids_params: ['top-viewed-day', 'top-viewed-week', 'top-viewed-month'],
      code: 404,
      value: false,
    },
  ];
  try {
    const { data } = await axios.get(`${url_zoro}/home`);
    const $ = ch.load(data);
    const most_cards = $(`div#${path} ul li`); //top-viewed-day, top-viewed-week, top-viewed-month
    const data_return = [{ path: path }];

    most_cards.each((i, e) => {
      const return_info = {
        title: "",
        views: "",
        likes: "",
        link: "",
        img: "",
      };
      return_info.title = $(e).find("h3.film-name").children("a").text().trim();
      return_info.link = $(e).find("h3.film-name").children("a").attr("href");
      return_info.views = $(e)
        .find("div.fd-infor")
        .children("span")
        .first()
        .text()
        .trim();
      return_info.likes = $(e)
        .find("div.fd-infor")
        .children("span")
        .last()
        .text()
        .trim();
      return_info.img = $(e).find("img").attr("data-src");
      data_return.push(return_info);
    });
    return data_return
  } catch (error) {
    return error_page;
  }
}

export default { MostViewd };
