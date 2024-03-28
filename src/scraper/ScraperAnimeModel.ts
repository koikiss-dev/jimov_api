import { Anime } from "../types/anime";
import { type IResultSearch, type IAnimeSearch } from "../types/search";
import { Episode } from "../types/episode";

export abstract class AnimeProviderModel {
  abstract readonly url: string;

  abstract GetAnimeInfo(anime: string): Promise<Anime>;

  abstract GetAnimeByFilter(
    ...args: any[]
  ): Promise<IResultSearch<IAnimeSearch>>;

  abstract GetEpisodeServers(...args: any[]): Promise<Episode>;
}
