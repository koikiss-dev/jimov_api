import {Router} from 'express';
import g from '../../../../scraper/sites/anime/monoschinos/Page.js'
const r = Router();

r.get('/anime/monoschinos/name/:name', (req, res) => {
    const {name} = req.params;
    g.getAnime(name).then(f => {
        res.send(f)
    })
})

export default r