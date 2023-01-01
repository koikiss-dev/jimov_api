import { Router } from "express";
import g from "../../../scraper/sites/animeflv/getPageMain.js";
const r = Router();

r.get("/anime/last-episodes", (req, res) => {
  g.getLasEpisodes().then((f) => {
    res.send(f);
  });
});

export default r;