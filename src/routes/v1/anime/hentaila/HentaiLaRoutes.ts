import { Router } from "express";
import { HentaiLa } from "../../../../scraper/sites/anime/hentaila/HentaiLa";
const Anime = new HentaiLa();
const router = Router();

// Filter
router.get("/anime/hentaila/filter", async (req, res) => {
  const { search } = req.query;

  const data = await Anime.GetItemByFilter(
    search as string
  );
  res.send(data);
});

// Anime Info +(Episodes list)
router.get("/anime/hentaila/name/:name", async (req, res) => {
  const { name } = req.params;
  const data = await Anime.GetItemInfo(name);
  res.send(data);
});

// Episode Info +(Video Servers)
router.get("/anime/hentaila/episode/:episode", async (req, res) => {
  const { episode } = req.params;
  const data = await Anime.GetEpisodeServers(episode);
  res.send(data);
});

export default router;
