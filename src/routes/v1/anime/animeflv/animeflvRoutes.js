import { Router } from "express";
import f from "../../../../scraper/sites/anime/animeflv/filter.js"; //filter anime
import a from "../../../../scraper/sites/anime/animeflv/getAnimeInfo.js"; //get anime info
import e from "../../../../scraper/sites/anime/animeflv/getEpisodeInfo.js"; //get episode info
import p from "../../../../scraper/sites/anime/animeflv/getPageMain.js"; //get page main and emit

const r = Router();

/*emit, last add and last episodes */
r.get("/anime/flv/emit", (req, res) => {
  p.getEmitAnime().then(f =>{
    res.send(f)
  })
});
r.get("/anime/flv/last-anime", (req, res) => {
  p.getLastAdd().then((f) => {
    res.send(f);
  });
});
r.get("/anime/flv/last-episodes", (req, res) => {
  p.getLasEpisodes().then((f) => {
    res.send(f);
  });
});
r.get("/anime/flv/:name", (req, res) => {
  a.animeInfo(req.params.name).then((f) => {
    res.send(f);
  });
});

/*emit, last add and last episodes */

r.get("/anime/flv/episode/:episode", (req, res) => {
  e.getEpisodeInfo(req.params.episode).then((f) => {
    res.send(f);
  });
});

r.get("/anime/flv/browse/filter", (req, res) => {
  //si se quita el browse deja de funcionar
  const { gen, year, type, status, ord, page } = req.query;
  f.Filter(gen, year, type, status, ord, page).then((f) => {
    res.send(f);
  });
});

export default r;
