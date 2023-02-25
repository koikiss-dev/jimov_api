import { load } from "cheerio";
import axios from "axios";

import {
	Post,
	NewsShema,
	NewsInfo,
} from "../../../../utils/shemaNewsProviders.js";

//url
const kudasaiUrl = {
	main: "https://somoskudasai.com/",
	posts: "https://somoskudasai.com/noticias",
};

//get post
async function PostsNews() {
	try {
		const { data } = await axios.get(kudasaiUrl.posts);
		const $ = load(data);
		const ShemaDataArray = new NewsShema();

		//get data post
		$("main section div.nwslst article").each((i, e) => {
			const cards = new Post();
			cards.title = $(e).find("h2").text().trim();
			cards.topics.push($(e).find("header > span").text().trim().split(" / "));
			cards.image = $("img.attachment-post-thumbnail").attr("src");
			cards.date = $(e).find("header div.ar-mt > span.db").text().trim();
			cards.url = $(e)
				.find("a")
				.attr("href")
				.replace("https://somoskudasai.com/noticias/", "/news/kudasai/");
			ShemaDataArray.data.push(cards);
		});

		return ShemaDataArray;
	} catch (error) {
		return error;
	}
}
//get new info
async function New(param) {
	try {
		const { data } = await axios.get(`${kudasaiUrl.posts}/${param}`);
		const $ = load(data);
		const ShemaDataArray = new NewsShema();

		//get general info
		$("section.single article").each((i, e) => {
			const news = new NewsInfo();
			news.title = $(e).find("h1").text().trim();
			news.topics.push($(e).find("span.typ").text().trim().split(" / "));
			news.banner = $(e).find("img").attr("src");
            news.uploadedBy = $(e).find('div.ar-mt span.fwb').text().trim();
            news.uploadedAt = $(e).find('div.ar-mt span.op5').text().trim();

			//get info
			$("main section div.entry").each((i, e) => {
				news.preview.full = $(e).find("p").text().trim();
                news.preview.images.push($(e).find('img').attr('src'));
			});
			ShemaDataArray.data.push(news);
		});

		return ShemaDataArray;
	} catch (error) {
        return error
    }
}

/* New(
	"mercancia-de-anime/chainsaw-man-makima-inspira-una-espectacular-figura/",
).then((f) => {
	console.log(f);
}); */
export default {PostsNews, New};
