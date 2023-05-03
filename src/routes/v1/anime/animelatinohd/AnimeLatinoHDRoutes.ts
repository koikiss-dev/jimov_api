import { Router } from "express";
import { AnimeLatinoHD } from "@providers/animelatinohd/AnimeLatinoHD";
const Anime = new AnimeLatinoHD();
const router = Router();

// Filter
router.get("/anime/animelatinohd/filter", async (req, res) => {
    let { search, type, page, year, genre } = req.query

    let data = await Anime.GetAnimeByFilter(search as string, type as unknown as number, page as unknown as number, year as string, genre as string)
    res.send(data)
});

// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/name/:name", async (req, res) => {

    let { name } = req.params
    let data = await Anime.GetAnimeInfo(name)
    res.send(data)

});

// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/episode/:episode", async (req, res) => {

    let { episode } = req.params
    let data = await Anime.GetEpisodeServers(episode)
    res.send(data)

});

router.get("/anime/animelatinohd/episode/:episode", async (req, res) => {

    let { episode } = req.params
    let data = await Anime.GetEpisodeServers(episode)
    res.send(data)

});
export default router