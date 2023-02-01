import { Router } from "express";
import animeFunctions from "../../../../scraper/sites/anime/animelatinohd/animelatinoFunctions.js";

const router = Router();

// Recent Episodes
router.get("/anime/animelatinohd/recent-episodes",animeFunctions.animeRecentEpisodesinfo);

// More popular
router.get("/anime/animelatinohd/most-popular")

// Most Seen
router.get("/anime/animelatinohd/most-seen")

// Calendar
router.get("/anime/animelatinohd/calendar")

// Search +(Filter)
router.get("/anime/animelatinohd/search")

// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/:title", animeFunctions.animeinfo);

// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/:title/episode/:episode", animeFunctions.animeEpisodeinfo);

export default router