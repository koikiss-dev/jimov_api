import { Router } from "express";
import g from "../../../../scraper/sites/anime/9Anime/9Anime.js";

const r = Router();

r.get("/anime/9anime/name/:name", (req, res) => {
  const { name } = req.params;
  g.NineAnimeInfo(name).then((f) => {
    res.send(f);
  });
});

export default r
