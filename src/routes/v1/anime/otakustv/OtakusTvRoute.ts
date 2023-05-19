import { OtakusTv } from "../../../../scraper/sites/anime/otakusTv/OtakusTv";
import { Router } from "express";

const r = Router();

const urlBase = "/anime/otakustv";

const OtakusService = new OtakusTv();

//anime info
r.get(`${urlBase}/name/:name`, async (req, res) => {
	try {
		const { name } = req.params;
		const animeInfo = await OtakusService.getAnimeInfo(name);
		res.send(animeInfo);
	} catch (error) {
		console.log(error);
		res.status(500).send("An error occurred getting anime info");
	}
});

//episode servers
r.get(`${urlBase}/episode/:name/:episode`, async (req, res) => {
	try {
		const { episode, name } = req.params;
		const animeInfo = await OtakusService.getEpisodeServers(name, episode);
		res.send(animeInfo);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});


export default r;
