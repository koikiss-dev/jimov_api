import { Router } from "express";
import g from "../../../scraper/sites/animeflv/getPageMain.js";
const r = Router();

r.get("/anime/emit", (req, res) => {
  g.getEmitAnime().then((f) => {
    res.send(f);
  });
});

export default r;
