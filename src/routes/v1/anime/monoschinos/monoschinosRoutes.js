import {Router} from 'express';
import g from '../../../../scraper/sites/anime/monoschinos/Page.js';
import e from '../../../../scraper/sites/anime/monoschinos/Page.js';
import f from '../../../../scraper/sites/anime/monoschinos/Page.js'
const r = Router();

r.get('/anime/monoschinos/name/:name', (req, res) => {
    const {name} = req.params;
    g.getAnime(name).then(f => {
        res.send(f)
    })
})
r.get('/anime/monoschinos/servers/:episode', (req, res) => {
    const {episode} = req.params;
    e.getEpisodeServers(episode).then(f =>{
        res.send(f)
    })
})
r.get('/anime/monoschinos/search', (req, res) => {
    const {category, genre, year, letter} = req.query;
    f.getFilterAnime(category, genre, year, letter).then(f => {
        res.send(f)
    })
})
export default r