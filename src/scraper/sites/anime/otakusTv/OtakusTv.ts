import { Anime, Chronology } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";
import axios from "axios";
import { load } from "cheerio";

export class OtakusTv {
	readonly url = "https://www1.otakustv.com";

	async getAnimeInfo(anime: string): Promise<Anime> {
		const $ = load((await axios(`${this.url}/anime/${anime}`)).data);

		const AnimeInfo = new Anime();

		AnimeInfo.name = $("#back_data_perfil div.inn-text > h1").text().trim();
		AnimeInfo.status = $("div.inn-text > span.btn-anime-info").text().trim();
		AnimeInfo.synopsis = $("#myModal div.modal-body").text().trim();
		AnimeInfo.image = {
			url: $("#back_data_perfil div.img-in > img").attr("src"),
		};

		const animeDate = $("#back_data_perfil span.date")
			.text()
			.trim()
			.split(" ")
			.pop()
			.split("-");

		AnimeInfo.date = {
			year: +animeDate[2],
			month: +animeDate[1],
			day: +animeDate[0],
		};

		AnimeInfo.stats = {};

		// Info about the anime stats
		const StatsElement = $("div.inn-text > div div.none-otakus-a");

		// Walk the stars
		StatsElement.find("span.starsx i").each((_, star) => {
			if ($(star).hasClass("activo")) {
				AnimeInfo.stats.rating = Number(AnimeInfo.stats.rating ?? 0) + 1;
			}
		});

		AnimeInfo.stats.score = +StatsElement.find("span:last")
			.text()
			.trim()
			.split("-")
			.shift()
			.trim();

		const InfoTabsElement = $("#nav-tabContent div.tab-pane");

		AnimeInfo.alt_name = $(InfoTabsElement)
			.eq(1)
			.find("div.col-xl-12 p:last span.lila-color")
			.text()
			.trim()
			.split(",")
			.map((s) => s.trim());

		$(InfoTabsElement)
			.eq(0)
			.find("div.container-fluid div.row")
			.children("div")
			.each((_i, episodeEl) => {
				const episode = new Episode();
				episode.name = $(episodeEl).find("p > span").text().trim();
				episode.image = $(episodeEl).find("a > img:first").attr("src").trim();
				episode.number = $(episodeEl).find("h1 > a").text().trim();
				episode.url = `/anime/otakustv/episode/${$(episodeEl)
					.find("h1 > a")
					.attr("href")
					.split("/")
					.slice(4)
					.join("/")}`;
				AnimeInfo.episodes.push(episode);
			});

		AnimeInfo.chronology = [];

		$(InfoTabsElement)
			.eq(1)
			.find("div:last-child div.row")
			.children("div")
			.each((_i, el) => {
				const chonology = new Chronology();
				chonology.name = $(el).find("h1").text().trim();
				chonology.url = `/anime/otakustv/name/${$(el)
					.find("a")
					.attr("href")
					.split("/")
					.slice(4)
					.join("/")}`;
				chonology.image = $(el).find("a > img:first").attr("src");

				AnimeInfo.chronology.push(chonology);
			});

		return AnimeInfo;
	}
	async getEpisodeServers(name: string, episode: string) {
		const $ = load(
			(await axios.get(`${this.url}/anime/${name}/${episode}`)).data,
		);
		const EpisodeInfo = new Episode();

		EpisodeInfo.name = $("div.container-fluid:first p.text-white")
			.text()
			.trim();
		EpisodeInfo.image = $("#ytplayer")
			.contents()
			.find("#embedVideoC > img")
			.attr("src");

		EpisodeInfo.url = `/anime/otakustv/episode/${name}/${episode}`;
		EpisodeInfo.number = +$("div.container-fluid:first h1.text-white")
			.text()
			.split("\n")
			.pop()
			.trim();

		// EpisodeInfo.servers
		const currentServer = new EpisodeServer();

		currentServer.name = $("body > div.container-fluid:first div:first p")
			.text()
			.trim();
		currentServer.url = $("#ytplayer").attr("src");

		EpisodeInfo.servers.push(currentServer);

		return EpisodeInfo;
	}
	// async filter() {}
}
