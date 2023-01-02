import { Router } from "express";
import j from "../../../scraper/sites/anime/animeflv/filter.js";
const r = Router();

r.get("/anime/browse/filter", (req, res) => {
  //si se quita el browse deja de funcionar
  const { gen, year, type, status, ord, page } = req.query;
  j.Filter(gen, year, type, status, ord, page).then((f) => {
    if (f) {
      res.send(f);
    } else {
      res.status(404).send({
        message: "Invalid query filter",
        code: 404,
      });
    }
  });
});

export default r;
