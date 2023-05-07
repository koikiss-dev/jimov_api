import { Router } from "express";
import { Monoschinos } from "../../../../scraper/sites/anime/monoschinos/Monoschinos";

const r = Router();

//anime info
r.get("/anime/monoschinos/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const monos = new Monoschinos();
    const animeInfo = await monos.getAnime(
      `https://monoschinos2.com/anime/${name}`
    );
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//episode servers
r.get("/anime/monoschinos/episode/:episode", async (req, res) => {
  try {
    const { episode } = req.params;
    const monos = new Monoschinos();
    const animeInfo = await monos.getEpisodeServers(
      `https://monoschinos2.com/ver/${episode}`
    );
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//filter
r.get("/anime/monoschinos/filter", async (req, res) => {
  try {
    const title = req.query.title as string
    const cat = req.query.category as string;
    const gen = req.query.gen as string;
    const year = req.query.year as string;
    const letter = req.query.letter as string;

    const monos = new Monoschinos();
    const animeInfo = await monos.filter(title, cat, gen, year, letter);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default r;
