import * as cheerio from "cheerio";
import axios from "axios";
import { AnimeMedia } from "../../../../types/anime";
import { Episode, EpisodeServer } from "../../../../types/episode";

import { ResultSearch, AnimeResult } from "../../../../types/search";
import { AnimeScraperModel } from "../../../../models/AnimeScraperModel";

export class HentaiLa extends AnimeScraperModel {
    readonly url = "https://www4.hentaila.com";

    async GetItemInfo(anime: string): Promise<AnimeMedia> {
        try {
            const formatUrl = !anime.includes("hentai-") ? "hentai-" + anime : anime;
            const { data } = await axios.get(`${this.url}/${formatUrl}`);
            const $ = cheerio.load(data);
            const genres = [];
            $(".genres a").each((_i, e) => genres.push($(e).text()));

            const AnimeInfo: AnimeMedia = {
                name: $(".hentai-single .h-header h1.h-title").text().trim(),
                url: `/anime/hentaila/name/${anime}`,
                synopsis: $(".hentai-single .h-content p").text(),
                image: {
                    url: `${this.url}${$(".hentai-single .h-thumb figure img").attr(
                        "src"
                    )}`,
                },
                genres: [...genres],
                nsfw: true,
                type: "Anime",
                status: $(".h-meta .status-on").text().includes("En Emision")
                    ? "En emisión"
                    : "Finalizado",
                episodes: [],
            };

            $(".episodes-list article").each((_i, e) => {
                const number = Number(
                    $(e)
                        .find("h2.h-title")
                        .text()
                        .replace(
                            $(".hentai-single .h-header h1.h-title").text() + " Episodio",
                            ""
                        )
                );
                const AnimeEpisode: Episode = {
                    name: $(e).find("h2.h-title").text(),
                    num: number,
                    thumbnail: {
                        url: `${this.url}${$(e).find(".h-thumb figure img").attr("src")}`,
                    },
                    url: `/anime/hentaila/episode/${formatUrl}-${number}`,
                };

                AnimeInfo.episodes.push(AnimeEpisode);
            });

            return AnimeInfo;
        } catch (error) {
            console.log(error);
        }
    }
    async GetEpisodeServers(episode: string): Promise<Episode> {
        try {
            const number = episode.substring(episode.lastIndexOf("-") + 1);
            const anime = episode.substring(0, episode.lastIndexOf("-"));
            const formaturl = anime.includes("hentai-")
                ? anime.replace("hentai-", "")
                : anime;
            const { data } = await axios.get(
                `${this.url}/ver/${formaturl}-${number}`
            );
            const $ = cheerio.load(data);

            const AnimeEpisodeInfo: Episode = {
                name: $(".section-header h1.section-title").text(),
                url: `/anime/hentaila/episode/${episode}`,
                num: Number(number),
                servers: [],
            };

            const video_script = $("script").get().at(-3).children[0].data;
            const video_format = eval(
                video_script
                    .slice(
                        video_script.indexOf("var videos ="),
                        video_script.lastIndexOf("$(document)")
                    )
                    .replace("var videos =", "")
            );
            for (let index = 0; index < video_format.length; index++) {
                const Server: EpisodeServer = {
                    name: video_format[index][0].includes("Yupi") ? "YourUpload" : video_format[index][0],
                    url: video_format[index][1],
                };
                AnimeEpisodeInfo.servers.push(Server);
            }

            AnimeEpisodeInfo.servers.sort((a, b) => a.name.localeCompare(b.name));
            return AnimeEpisodeInfo;
        } catch (error) {
            console.log(error);
        }
    }

    async GetItemByFilter(
        search?: string
    ): Promise<ResultSearch<AnimeResult>> {
        try {
            const content = new FormData();
            content.append("value", search);
            const { data } = await axios.post(`${this.url}/api/search`, content);

            const animeSearch: ResultSearch<AnimeResult> = {
                nav: {
                    count: data.length,
                    current: 1,
                    next: 0,
                    hasNext: false,
                },
                results: [],
            };
            data.map((e) => {
                const animeSearchData: AnimeResult = {
                    name: e.title,
                    image: `${this.url}/uploads/portadas/${e.id}.jpg`,
                    url: `/anime/hentaila/name/${e.slug}`,
                    type: "Anime",
                };
                animeSearch.results.push(animeSearchData);
            });
            return animeSearch;
        } catch (error) {
            console.log(error);
        }
    }
}
