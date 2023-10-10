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
    let { season } = req.query
    let data = await Anime.GetEpisodeServers(episode, season)
    res.send(data)
})

router.get("/anime/wcostream/filter", async (req, res) => {
    let { search,page } = req.query
    let data = await Anime.GetAnimeByFilter(search as string,page as unknown as number)
    res.send(data)
})


export default router