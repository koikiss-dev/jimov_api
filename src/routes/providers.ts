import { Router } from "express";

const router = Router();

interface ProviderScraper {
  name: string;
  description: string;
  language: string;
  status: number | string;
  url: string;
}

const providers: ProviderScraper[] = [
  {
    name: "AnimeFlv",
    description:
      "The best online anime portal for Latin America, find classic anime, anime of the moment, most popular anime and much more, all in animeflv, your daily anime source.",
    language: "Spanish",
    url: "https://www2.animeflv.bz",
    status: 200,
  },
  {
    name: "AnimeLatinoHD",
    description:
      "Anime Online Free, watch the latest anime episodes of the moment without any restriction subtitled in Spanish Latino in AnimeLHD.",
    language: "Spanish",
    url: "https://www.animelatinohd.com/",
    status: 200,
  },
  {
    name: "MonosChinos",
    description:
      "Monoschinos - Your website to watch and download anime with Spanish subtitles for free online - Watch anime in HD 1080p & HD 720p quality.",
    language: "Spanish",
    url: "https://monoschinos2.com/",
    status: 200,
  },
  {
    name: "OtakusTv",
    description:
      "Anime, share your favorite anime lists, find the best reviews of your favorite anime episodes, Tops, news, separate your anime by watched, watched, finished, abandoned and more.",
    language: "Spanish",
    url: "https://www1.otakustv.com/",
    status: 200,
  },
  {
    name: "TioAnime",
    description:
      "The best portal to watch anime online sub spanish in HD quality, download light anime in HD from Mega, Mediafire and more! TioAnime your best option.",
    language: "Spanish",
    url: "https://tioanime.com/",
    status: 200,
  },
  {
    name: "GogoAnime",
    description:
      "Gogoanime, Watch anime online in English. You can watch free series and movies online and English subtitle on gogoanime",
    language: "English",
    url: "https://www3.gogoanimes.fi/",
    status: 200,
  },
  {
    name: "Zoro",
    description:
      "Zoro is a Free anime streaming website which you can watch English Subbed and Dubbed Anime online with No Account and Daily update.",
    language: "English",
    url: "https://zoro.to/home",
    status: 200,
  },
  {
    name: "9Anime",
    description: "Real 9anime with the world largest anime database and fast streaming servers.",
    language: "English",
    url: "https://9anime.to/home",
    status: 200,
  },
];

router.get("/providers", (_req, res) => {
  res.status(200).json({ data: providers });
});

export default router;
