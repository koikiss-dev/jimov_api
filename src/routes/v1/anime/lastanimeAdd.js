import { Router } from "express";
import g from "../../../scraper/sites/animeflv/getPageMain.js";
const r = Router();

r.get("/anime/last-anime", (req, res) => {
  g.getLastAdd().then((f) => {
    res.send(f);
  });
});

export default r;