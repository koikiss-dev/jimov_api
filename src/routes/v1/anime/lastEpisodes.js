import { Router } from "express";
import g from "../../../scraper/sites/animeflv/getPageMain.js";
const r = Router();

r.get("/anime/last-episodes", (req, res) => {
  g.getLasEpisodes().then((f) => {
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
