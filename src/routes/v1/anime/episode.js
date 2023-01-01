import { Router } from "express";
import g from "../../../scraper/sites/animeflv/getEpisodeInfo.js";
const r = Router();

r.get("/anime/episode/:episode", (req, res) => {
  g.getEpisodeInfo(req.params.episode).then((f) => {
    res.send(f);
  });
});

export default r;