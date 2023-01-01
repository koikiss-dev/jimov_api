import { Router } from "express";
import g from "../../../scraper/sites/animeflv/getAnimeInfo.js";
const r = Router();

r.get("/anime/:name", (req, res) => {
  g.animeInfo(req.params.name).then(f => {
    res.send(f)
  })
});

export default r;