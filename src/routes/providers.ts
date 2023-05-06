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
  apiID: string
  favicon: string | string[];
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
    const title = $("meta[property=og:site_name]").attr("content") || ""
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
    apiID: "flv",
    favicon: [
      "https://animeflv.vc/favicon.png",
      "https://image.winudf.com/v2/image1/Y29tLmFuZHJpb2p1dHRkZXYuYW5pbWVfZmx5X2ljb25fMTY3NjA4MjY1Ml8wODM/icon.png?w=184&fakeurl=1",
    ],
  },
  {
    name: "AnimeLatinoHD",
    description:
      "Anime Online Free, watch the latest anime episodes of the moment without any restriction subtitled in Spanish Latino in AnimeLHD.",
    language: "Spanish",
    url: "https://www.animelatinohd.com/",
    status: 200,
    icon: "https://www.pngarts.com/files/4/Dragon-Ball-PNG-Photo.png",
    apiID: "animelatinohd",
    favicon: [
      "https://www.animelatinohd.com/favicon.ico",
      "https://www.pngarts.com/files/4/Dragon-Ball-PNG-Photo.png",
    ],
  },
  {
    name: "MonosChinos",
    description:
      "Monoschinos - Your website to watch and download anime with Spanish subtitles for free online - Watch anime in HD 1080p & HD 720p quality.",
    language: "Spanish",
    url: "https://monoschinos2.com/",
    status: 200,
    icon: "https://monoschinos2.com/public/img/logo6.png",
    apiID: "monoschinos",
    favicon: [
      "https://monoschinos2.com/public/favicon.ico",
      "https://image.winudf.com/v2/image1/Y29tLm1vbm9zY2hpbm9zLmFuaW1lc19pY29uXzE2Mjg2NDIxMDRfMDQ1/icon.png?w=184&fakeurl=1",
    ],
  },
  {
    name: "TioAnime",
    description:
      "The best portal to watch anime online sub spanish in HD quality, download light anime in HD from Mega, Mediafire and more! TioAnime your best option.",
    language: "Spanish",
    url: "https://tioanime.com/",
    status: 200,
    icon: "https://tioanime.com/assets/img/logo-dark.png",
    apiID: "tioanime",
    favicon: [
      "https://tioanime.com/assets/img/icon-32x32.png",
      "https://image.winudf.com/v2/image1/Y29tLmFuaW1laGRicmVubmFuLnRpb2FuaW1lX2ljb25fMTY1MjI2MjEzN18wNzg/icon.png?w=184&fakeurl=1",
    ],
  },
  {
    name: "GogoAnime",
    description:
      "Gogoanime, Watch anime online in English. You can watch free series and movies online and English subtitle on gogoanime",
    language: "English",
    url: "https://www3.gogoanimes.fi/",
    status: 200,
    icon: "https://gogoanime.llc/img/icon/logo.png",
    apiID: "gogoanime",
    favicon: [
      "https://cdn.gogocdn.net/files/gogo/img/favicon.ico",
      "https://image.winudf.com/v2/image1/Y29tLkhtWnl5LmdvZ29hbmltZV9pY29uXzE2MTI5NTg4NjRfMDc3/icon.png?w=184&fakeurl=1",
    ],
  },
  {
    name: "Zoro",
    description:
      "Zoro is a Free anime streaming website which you can watch English Subbed and Dubbed Anime online with No Account and Daily update.",
    language: "English",
    url: "https://zoro.to/home",
    status: 200,
    icon: "https://zoro.to/images/logo.png",
    apiID: "zoro",
    favicon: [
      "https://zoro.to/favicon-32x32.png",
      "https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/32/f3/97/32f397ca-04f1-3403-165f-0f00302f10ce/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/256x256bb.jpg",
    ],
  },
];

router.get("/providers", (_req, res) => {
  res.status(200).json({ data: providers });
});

export default router;
