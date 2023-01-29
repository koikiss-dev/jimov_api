import { Router } from "express";
import g from "../../../../scraper/sites/anime/zoro/zoro_AnimeFeatured.js";
import h from "../../../../scraper/sites/anime/zoro/zoro_AnimeInfo.js";
import e from "../../../../scraper/sites/anime/zoro/zoro_episode.js";
import f from '../../../../scraper/sites/anime/zoro/zoro_filter.js'
import m from '../../../../scraper/sites/anime/zoro/zoro_MostViewed.js'
import re from '../../../../scraper/sites/anime/zoro/zoro_Recent_Upcoming.js'
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

/*episode server id */
r.get("/anime/zoro/servers/:name/:id", (req, res) => {
  const {id, name} = req.params
  e.getServersId(name, id).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});

r.get("/anime/zoro/iframe/:id", (req, res) => {
  const {id} = req.params
  e.getServers(id).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});

/*filter anime */
r.get("/anime/zoro/get/filter", (req, res) => {
  const {type, rated, score, season, lan, sort, genres, page} = req.query
  f.filterAnime(type, rated, score, season, lan, sort, genres, page).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});

/*most viewed */
r.get("/anime/zoro/view_most/:path", (req, res) => {
  const {path} = req.params
  m.MostViewd(path).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});

/*recent upcoming */
r.get("/anime/zoro/view_recent/:id", (req, res) => {
  const {id} = req.params
  const {page} = req.query
  re.RecentUpload_Upcoming(id, page).then((f) => {
    if (f[0]?.code === 404) {
      res.status(404).send(f);
    } else {
      res.send(f);
    }
  });
});
export default r;
