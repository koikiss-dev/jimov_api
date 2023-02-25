import { Router } from "express";
import g from "../../../../scraper/sites/anime/tioanime/Page.js";
import server from '../../../../scraper/sites/anime/tioanime/Page.js';
import filter from '../../../../scraper/sites/anime/tioanime/filter.js';
const r = Router();

//get anime info
r.get("/anime/tioanime/name/:name", (req, res) => {
  const { name } = req.params;
  g.getAnime(`https://tioanime.com/anime/${name}`).then((f) => {
    res.send(f);
  });
});

//get episode servers
r.get("/anime/tioanime/servers/:episode", (req, res) => {
  const {episode} = req.params;
  server.getEpisodeServers(`https://tioanime.com/ver/${episode}`).then(f => {
    res.send(f)
  })
})

//filter anime
r.get('/anime/tioanime/anime/filter', (req, res) => {
  const {types, genres, begin_year, end_year, status, number, sort} = req.query;
  filter.filter(types, genres, {begin: begin_year, end: end_year}, status, sort).then(f => {
    res.send(f)
  })
})

export default r
