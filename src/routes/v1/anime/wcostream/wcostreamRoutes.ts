import { Router } from "express";
import { WcoStream } from "../../../../scraper/sites/anime/wcostream/WcoStream";
const Anime = new WcoStream();
const router = Router();

router.get("/anime/wcostream/name/:name", async (req, res) => {
    const { name } = req.params
    const data = await Anime.GetAnimeInfo(name)

    res.send(data)
})

router.get("/anime/wcostream/episode/:episode", async (req, res) => {
    const { episode } = req.params
    const { season } = req.query
    const data = await Anime.GetEpisodeServers(episode, season as unknown as number)

    res.send(data)
})

router.get("/anime/wcostream/filter", async (req, res) => {
    const { search, page } = req.query
    const data = await Anime.GetAnimeByFilter(search as string, page as unknown as number)

    res.send(data)
})

/*
    Global API
*/

router.post("/runtime/unpacked", async (req,res) => {
    const {base64} = req.body
    const data = await Anime.RuntimeUnpacked(base64)
    return res.send(data)
})

export default router