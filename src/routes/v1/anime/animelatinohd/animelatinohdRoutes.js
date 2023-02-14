import { Router } from "express";
import animefunctions from "../../../../scraper/sites/anime/animelatinohd/animelatinoFunctions.js";

const router = Router();

// Search
router.get("/anime/animelatinohd/search/:search",animefunctions.animeSearch);

// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/:title", animefunctions.animeinfo);

// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/:title/episode/:episode", animefunctions.animeEpisodeinfo);

export default router