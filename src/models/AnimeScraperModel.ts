import type { Anime } from "../types/anime";
import type { IAnimeSearch } from "../types/search";
import type { Episode } from "../types/episode";
import { BaseScraperModel } from "./BaseScraperModel";

export abstract class AnimeScraperModel extends BaseScraperModel<Anime, IAnimeSearch> {
  public abstract GetEpisodeServers(...args: unknown[]): Promise<Episode>;
}
