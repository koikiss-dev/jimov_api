import {Router} from 'express'
import {getAnimeInfo} from '../../../../scraper/sites/anime/gogoanime/getAnimeInfo.js';
import server from '../../../../scraper/sites/anime/gogoanime/getAnimeServer.js'

const r = Router();

getAnimeInfo('punirunes').then(f => {
	console.log(f)
})

server.getAnimeServer("bocchi the rock", 3).then(f => {
	console.log(f)
})
//anime info
r.get('/anime/gogoanime/name/:name', (req, res) => {
	const {name} = req.params;
	getAnimeInfo(name).then(f => {
		res.send(f)
	})
})

//episode
r.get('/anime/gogoanime/name/:name/episode/:ep', (req, res) => {
	const {name, ep} = req.params;
	server.getAnimeServer(name, ep).then(f => {
		res.send(f)
	})
})

export default r
