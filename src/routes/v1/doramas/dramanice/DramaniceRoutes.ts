import { Router } from "express";
import { Dramanice } from "@providers/dramanice/Dramanice";
const Dorama = new Dramanice();
const router = Router();

// Filter
router.get("/anime/animelatinohd/filter", async (req, res) => {
    const { search, type, page, year, genre } = req.query

    const data = await Dorama.GetAnimeByFilter(search as string, type as unknown as number, page as unknown as number, year as string, genre as string)
    res.send(data)
});

// Anime Info +(Episodes list)
router.get("/anime/animelatinohd/name/:name", async (req, res) => {

    const { name } = req.params
    const data = await Dorama.GetAnimeInfo(name)
    res.send(data)

});

// Episode Info +(Video Servers)
router.get("/anime/animelatinohd/episode/:episode", async (req, res) => {
    const { lang } = req.query
    const { episode } = req.params
    const data = await Dorama.GetEpisodeServers(episode, lang as string)
    res.send(data)

});

export default router