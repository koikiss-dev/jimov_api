import { Router } from "express";
import animefunctions from "../../../../scraper/sites/anime/animelatinohd/animelatinoFunctions.js";

const router = Router();

// Recent Episodes
//router.get("/anime/animelatinohd/recent-episodes",animefunctions.animeRecentEpisodesinfo);

// Most popular
//router.get("/anime/animelatinohd/most-popular",animefunctions.animeMostPopular);

// Most viewed
//router.get("/anime/animelatinohd/most-viewed",animefunctions.animeMostviewed);

// Calendar
//router.get("/anime/animelatinohd/calendar",animefunctions.animeCalendar);

// Search
router.get("/anime/animelatinohd/search/:search",animefunctions.animeSearch);

// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/:title", animefunctions.animeinfo);

// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/:title/episode/:episode", animefunctions.animeEpisodeinfo);

export default router