import { Router } from "express";
import j from "../../../scraper/sites/animeflv/filter.js";
const r = Router();

r.get("/anime/browse/filter", (req, res) => {//si se quita el browse deja de funcionar
  const { gen, year, type, status, ord, page } = req.query;
  j.Filter(gen, year, type, status, ord, page).then((g) => {
    res.send(g);
  });
});

export default r;
