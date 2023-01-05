import { Router } from "express";
import g from "../../../../scraper/sites/anime/animeflv/getEpisodeInfo.js";
const r = Router();

r.get("/anime/episode/:episode", (req, res) => {
  g.getEpisodeInfo(req.params.episode).then((f) => {
    if (f) {
      res.send(f);
    } else {
      res.status(404).send({
        message: "Invalid anime episode",
        code: 404,
      });
    }
  });
});

export default r;
