import {Router} from 'express';
import g from '../../../../scraper/sites/anime/monoschinos/Page.js';
import e from '../../../../scraper/sites/anime/monoschinos/Page.js';
import f from '../../../../scraper/sites/anime/monoschinos/filter.js'
const r = Router();

//anime info
r.get('/anime/monoschinos/name/:name', (req, res) => {
    const {name} = req.params;
    g.getAnime(`https://monoschinos2.com/anime/${name}`).then(f => {
        res.send(f)
    })
})

//get episode servers
r.get('/anime/monoschinos/name/:name/episode/:ep', (req, res) => {
    const {name, ep} = req.params;
    //https://monoschinos2.com/ver/mou-ippon-episodio-8
    e.getEpisodeServers(`https://monoschinos2.com/ver/${name}-episodio-${ep}`).then(f =>{
        res.send(f)
    })
})

//filter anime by params
r.get('/anime/monoschinos/search', (req, res) => {
    const {category, genre, year, letter} = req.query;
    f.filter(category, genre, year, letter).then(f => {
        res.send(f)
    })
})
export default r