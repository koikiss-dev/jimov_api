import { Router } from "express";
/* import axios from "axios";
import { load } from "cheerio"; */

const router = Router();

interface ProviderScraper {
  name: string;
  description: string;
  language: string;
  status: number | string;
  icon: string;
  url: string;
}

/* async function getDataProvider() {
  const urls = [
    "https://www2.animeflv.bz",
    "https://www.animelatinohd.com/",
    "https://monoschinos2.com/",
    "https://tioanime.com/",
    "https://www3.gogoanimes.fi/",
    "https://zoro.to/home",
    "https://9anime.to/home",
  ];
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const {data} = await axios.get(urls[i]);
    const $ = load(data);
    const title = $('title').text().trim();
    const favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';
    const description = $('meta[name="description"]').attr('content') || '';
    results.push({title, favicon, description});
  }
  return results;
} */


const providers: ProviderScraper[] = [
  {
    name: "AnimeFlv",
    description:
      "The best online anime portal for Latin America, find classic anime, anime of the moment, most popular anime and much more, all in animeflv, your daily anime source.",
    language: "Spanish",
    url: "https://www2.animeflv.bz",
    status: 200,
    icon: "https://animeflv.vc/static/img/icon/logo.png",
  },
  {
    name: "AnimeLatinoHD",
    description:
      "Anime Online Free, watch the latest anime episodes of the moment without any restriction subtitled in Spanish Latino in AnimeLHD.",
    language: "Spanish",
    url: "https://www.animelatinohd.com/",
    status: 200,
    icon: "NA"
  },
  {
    name: "MonosChinos",
    description:
      "Monoschinos - Your website to watch and download anime with Spanish subtitles for free online - Watch anime in HD 1080p & HD 720p quality.",
    language: "Spanish",
    url: "https://monoschinos2.com/",
    status: 200,
    icon: "https://monoschinos2.com/public/img/logo6.png"
  },
  {
    name: "OtakusTv",
    description:
      "Anime, share your favorite anime lists, find the best reviews of your favorite anime episodes, Tops, news, separate your anime by watched, watched, finished, abandoned and more.",
    language: "Spanish",
    url: "https://www1.otakustv.com/",
    status: 200,
    icon: "https://www1.otakustv.com/images/logo.png?v=1",
  },
  {
    name: "TioAnime",
    description:
      "The best portal to watch anime online sub spanish in HD quality, download light anime in HD from Mega, Mediafire and more! TioAnime your best option.",
    language: "Spanish",
    url: "https://tioanime.com/",
    status: 200,
    icon: "https://tioanime.com/assets/img/logo-dark.png"
  },
  {
    name: "GogoAnime",
    description:
      "Gogoanime, Watch anime online in English. You can watch free series and movies online and English subtitle on gogoanime",
    language: "English",
    url: "https://www3.gogoanimes.fi/",
    status: 200,
    icon: "https://gogoanime.llc/img/icon/logo.png"
  },
  {
    name: "Zoro",
    description:
      "Zoro is a Free anime streaming website which you can watch English Subbed and Dubbed Anime online with No Account and Daily update.",
    language: "English",
    url: "https://zoro.to/home",
    status: 200,
    icon: "https://zoro.to/images/logo.png"
  },
  {
    name: "9Anime",
    description:
      "Real 9anime with the world largest anime database and fast streaming servers.",
    language: "English",
    url: "https://9anime.to/home",
    status: 200,
    icon: "https://9animeapp.pro/wp-content/uploads/2023/02/cropped-9anime-logo-for-app-1.png"
  },
];

router.get("/providers", (_req, res) => {
  res.status(200).json({ data: providers });
});

export default router;
