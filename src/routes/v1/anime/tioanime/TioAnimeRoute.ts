import { Router } from "express";
import { TioAnime } from "../../../../scraper/sites/anime/tioanime/TioAnime";
const r = Router();

//anime info with name
r.get("/anime/tioanime/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const tioanime = new TioAnime();
    const animeInfo = await tioanime.getAnime(
      `https://tioanime.com/anime/${name}`
    );
    res.send({
      data: [{ animeInfo }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//episode servers
r.get("/anime/tioanime/episode/:episode", async (req, res) => {
  try {
    const { episode } = req.params;
    const tioanime = new TioAnime();
    const animeInfo = await tioanime.getEpisodeServers(
      `https://tioanime.com/ver/${episode}`
    );
    res.send({
      data: [{ animeInfo }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//filter
r.get("/anime/tioanime/filter", async (req, res) => {
  try {
    const types = (req.query.type as string[]) ?? [];
    const genres = (req.query.gen as string[]) ?? [];

    const begin = (req.query.begin_year as unknown as number) ?? 1950;
    const end = (req.query.end_year as unknown as number) ?? new Date().getFullYear();

    const status = (req.query.status as unknown as number) ?? 2;
    const sort = (req.query.sort as string) ?? "recent";

    const tioanime = new TioAnime();
    const animeInfo = await tioanime.filter(types, genres, {begin, end}, status, sort);
    res.send({
      data: [{ animeInfo }],
    });
   //console.log(tioanime.filter(types, genres, { begin: begin, end: end }, status, sort).then(result => { console.log(result) } ));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default r;
