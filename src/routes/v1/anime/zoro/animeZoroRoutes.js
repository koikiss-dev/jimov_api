import { Router } from "express";
import g from "../../../../scraper/sites/anime/zoro/zoro_AnimeFeatured.js";
import h from "../../../../scraper/sites/anime/zoro/zoro_AnimeInfo.js";
const r = Router();

/*featured */
r.get("/anime/zoro/:featured", (req, res) => {
  const { page } = req.query;
  g.AnimeFeatured(req.params.featured, page).then((f) => {
    if (f[0]?.value) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});

/* info and search*/
r.get("/anime/zoro/name/:name", (req, res) => {
  const { page } = req.query;
  h.AnimeInfo(req.params.name, page).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});

/*search */

r.get("/anime/zoro/search/:name", (req, res) => {
  const { page } = req.query;
  h.searchZoro(req.params.name, page).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});
export default r;
