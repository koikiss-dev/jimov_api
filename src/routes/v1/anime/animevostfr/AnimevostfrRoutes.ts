import { Router } from "express";
import { Animevostfr } from "../../../../scraper/sites/anime/animevostfr/Animevostfr";
const Anime = new Animevostfr();
const router = Router();

// Filter
router.get("/anime/animevostfr/filter", async (req, res) => {
  const { search, page } = req.query;

  const data = await Anime.GetItemByFilter(
    search as string,
    page as unknown as number
  );
  res.send(data);
});

// Anime Info +(Episodes list)
router.get("/anime/animevostfr/name/:name", async (req, res) => {
  const { name } = req.params;
  const data = await Anime.GetItemInfo(name);
  res.send(data);
});

// Episode Info +(Video Servers)
router.get("/anime/animevostfr/episode/:episode", async (req, res) => {
  const { episode } = req.params;
  const data = await Anime.GetEpisodeServers(episode);
  res.send(data);
});

export default router;
