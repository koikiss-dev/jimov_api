import { Router } from "express";
import f from "../../../../scraper/sites/anime/animeflv/filter.js"; //filter anime
import a from "../../../../scraper/sites/anime/animeflv/getAnimeInfo.js"; //get anime info
import e from "../../../../scraper/sites/anime/animeflv/getEpisodeInfo.js"; //get episode info

const r = Router();

// Endpoint to retrieve information about a specific anime by name
r.get("/anime/flv/:name", (req, res) => {
  a.animeInfo(req.params.name).then((f) => {
    res.send(f);
  });
});

// Endpoint to retrieve information about a specific episode by episode number
r.get("/anime/flv/episode/:episode", (req, res) => {
  e.getEpisodeInfo(req.params.episode).then((f) => {
    res.send(f);
  });
});

// Endpoint to filter anime based on various criteria
r.get("/anime/flv/browse/filter", (req, res) => {
  const { gen, year, type, status, ord, page } = req.query;
  f.Filter(gen, year, type, status, ord, page).then((f) => {
    res.send(f);
  });
});

export default r;
