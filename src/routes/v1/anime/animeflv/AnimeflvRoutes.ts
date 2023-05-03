import { Router } from "express";
import { AnimeFlv } from "../../../../scraper/sites/anime/animeflv/AnimeFlv";
import {
  Genres,
  TypeAnimeflv,
  StatusAnimeflv,
  OrderAnimeflv,
} from "../../../../scraper/sites/anime/animeflv/animeflv_helper";
const r = Router();


//anime info
r.get("/anime/flv/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const flv = new AnimeFlv();
    const animeInfo = await flv.GetAnimeInfo(name);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//episode servers
r.get("/anime/flv/episode/:episode", async (req, res) => {
  try {
    const { episode } = req.params;
    const flv = new AnimeFlv();
    const animeInfo = await flv.GetEpisodeServers(episode);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
 
//filter
r.get("/anime/flv/filter", async (req, res) => {
  try {
    const gen = req.query.gen as Genres;
    const date = req.query.date as string;
    const type = req.query.type as TypeAnimeflv;
    const status = req.query.status as StatusAnimeflv;
    const ord = req.query.ord as OrderAnimeflv;
    const page = req.query.page as unknown as number;
    const title = req.query.title as string;

    const flv = new AnimeFlv();
    const animeInfo = await flv.Filter(gen, date, type, status, ord, page, title);
    res.send(animeInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default r;
