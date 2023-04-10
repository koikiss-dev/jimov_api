import { Router } from "express";
import {
  GogoanimeInfo,
  GogoanimeServer,
  GogoanimeFilter,
} from "../../../../scraper/sites/anime/gogoanime/Gogoanime";

const r = Router();

//anime info
r.get("/anime/gogoanime/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const gogo = new GogoanimeInfo();
    const animeInfo = await gogo.getAnimeInfo(name);
    res.send({
      data: [{ animeInfo }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//episode servers
r.get("/anime/gogoanime/episode/:name/:episode", async (req, res) => {
  try {
    const { name, episode } = req.params;
    const gogo = new GogoanimeServer();
    const animeInfo = await gogo.getAnimeServerEpisode(
      name,
      episode as unknown as number
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
r.get("/anime/gogoanime/filter", async (req, res) => {
  try {
    const gen = req.query.gen as string;
    const season = req.query.season as string;
    const year = req.query.year as string;

    const gogo = new GogoanimeFilter();
    let animeInfo: unknown;

    if (gen) {
      animeInfo = await gogo.getAnimesfilterByGenre(gen);
    } else if (season && year) {
      animeInfo = await gogo.filterBySeasons(season, year);
    } else {
      throw new Error("Missing parameters");
    }

    res.send({
      data: [{ animeInfo }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default r;
