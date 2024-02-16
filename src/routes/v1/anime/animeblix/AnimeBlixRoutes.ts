import { Router } from "express";
import { AnimeBlix } from "../../../../scraper/sites/anime/animeBlixs/AnimeBlix";

const Anime = new AnimeBlix();
const router = Router();

// Filter
router.get("/anime/animeblix/filter", async (req, res) => {
    const { search, type, page, year, genre } = req.query

    const data = await Anime.GetAnimeByFilter(search as string, type as unknown as number, page as unknown as number, year as string, genre as string)
    res.send(data)
});

// Anime Info +(Episodes list)
router.get("/anime/animeblix/name/:name", async (req, res) => {

    const { name } = req.params
    const data = await Anime.GetAnimeInfo(name.includes("ver-")? name.replace("ver-","") : name)
    res.send(data)

});

// Episode Info +(Video Servers)
router.get("/anime/animeblix/episode/:episode", async (req, res) => {
    const { episode } = req.params
    const data = await Anime.GetEpisodeServers(episode)
    res.send(data)

});

export default router