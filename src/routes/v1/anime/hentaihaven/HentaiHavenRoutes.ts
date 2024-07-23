import { Router } from "express";
import { HentaiHaven } from "../../../../scraper/sites/anime/hentaihaven/HentaiHaven";
const Anime = new HentaiHaven();
const router = Router();

// Filter
router.get("/anime/hentaihaven/filter", async (req, res) => {
  const { search, page } = req.query;

  const data = await Anime.GetItemByFilter(
    search as string,
    page as unknown as number
  );
  res.send(data);
});

// Anime Info +(Episodes list)
router.get("/anime/hentaihaven/name/:name", async (req, res) => {
  const { name } = req.params;
  const data = await Anime.GetItemInfo(name);
  res.send(data);
});

// Episode Info +(Video Servers)
router.get("/anime/hentaihaven/episode/:episode", async (req, res) => {
  const { episode } = req.params;
  const data = await Anime.GetEpisodeServers(episode);
  res.send(data);
});

export default router;
