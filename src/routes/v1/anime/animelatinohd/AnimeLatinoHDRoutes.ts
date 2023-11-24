import { Router } from "express";
import { AnimeLatinoHD } from "../../../../scraper/sites/anime/animelatinohd/AnimeLatinoHD";
const Anime = new AnimeLatinoHD();
const router = Router();

// Filter
router.get("/anime/animelatinohd/filter", async (req, res) => {
    const { search, type, page, year, genre } = req.query

    const data = await Anime.GetAnimeByFilter(search as string, type as unknown as number, page as unknown as number, year as string, genre as string)
    res.send(data)
});

// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/name/:name", async (req, res) => {

    const { name } = req.params
    const data = await Anime.GetAnimeInfo(name)
    res.send(data)

});

// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/episode/:episode", async (req, res) => {
    const { lang } = req.query
    const { episode } = req.params
    const data = await Anime.GetEpisodeServers(episode, lang as string)
    res.send(data)

});

export default router