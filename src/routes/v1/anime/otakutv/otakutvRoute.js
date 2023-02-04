import { Router } from "express";
import g from "../../../../scraper/sites/anime/otakuTV/getAnime.js";
import c from "../../../../scraper/sites/anime/otakuTV/getAnimeComingSoon.js";
import l from '../../../../scraper/sites/anime/otakuTV/getAnimeLatino.js'
import n from "../../../../scraper/sites/anime/otakuTV/getAnimeNew.js";
import ra from '../../../../scraper/sites/anime/otakuTV/getAnimeRanking.js'
import u from "../../../../scraper/sites/anime/otakuTV/getUsersActive.js";
const r = Router();

//coming soon
r.get("/anime/otakuTV/coming-soon", (req, res)=>{
    c.getComingSoon().then(f =>{
        res.send(f)
    })
})

//latino anime
r.get("/anime/otakuTV/anime-latin", (req, res) => {
    l.getAnimeLatino().then(f => {
        res.send(f)
    })
})

//news
r.get("/anime/otakuTV/anime-new", (req, res) => {
    n.getAnimeNew().then(f => {
        res.send(f)
    })
})

//anime ranking 
r.get("/anime/otakuTV/anime-ranking", (req, res) => {
    ra.getAnimeRanking().then(f => {
        res.send(f)
    })
})

//user-ranking
r.get("/anime/otakuTV/user-top", (req, res) => {
    u.getUsersActive().then(f => {
        res.send(f)
    })
})

//name anime
r.get("/anime/otakuTV/:name", (req, res)=>{
    const {name} = req.params
    g.getAnime(name).then(f => {
        res.send(f)
    })
})

export default r