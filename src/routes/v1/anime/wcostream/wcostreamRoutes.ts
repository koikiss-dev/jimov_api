import { Router } from "express";
import { WcoStream } from "../../../../scraper/sites/anime/wcostream/WcoStream";
const Anime = new WcoStream();
const router = Router();



router.get("/anime/wcostream/name/:name", async (req, res) => {
    let { name } = req.params
    let data = await Anime.GetAnimeInfo(name)

    res.send(data)
})

router.get("/anime/wcostream/episode/:episode", async (req, res) => {
    let { episode } = req.params
    let {id} =req.query
    let data = await Anime.GetEpisodeServers(episode,id)
    res.send(data)
})

export default router