import { Router } from "express";
import { Zoro } from "../../../../scraper/sites/anime/zoro/Zoro";
const r = Router();

//anime info
r.get("/anime/zoro/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const zoro = new Zoro();
    const animeInfo = await zoro.GetAnimeInfo(name);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//episode servers
r.get("/anime/zoro/episode/:episode/:ep", async (req, res) => {
  try {
    const { episode, ep } = req.params;
    const zoro = new Zoro();
    const animeInfo = await zoro.GetEpisodeServer(episode, ep);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//filter
r.get("/anime/zoro/filter", async (req, res) => {
  try {
    const type = req.query.type as string;
    const rated = req.query.rated as string;
    const score = req.query.score as string;
    const season = req.query.season as string;
    const language = req.query.language as string;
    const sort = req.query.sort as string;
    const gen = req.query.gen as string;
    const page = req.query.page as string;

    const zoro = new Zoro();
    const animeInfo = await zoro.Filter(type, rated, score, season, language, sort, gen, page);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default r;
