import { AnimeMedia } from "../types/anime";
import { Episode } from "../types/episode";
import { IAnimeResult } from "../types/search";
import { BaseScraperModel } from "./BaseScraperModel";

export abstract class AnimeScraperModel extends BaseScraperModel<
  AnimeMedia,
  IAnimeResult
> {
  public abstract GetEpisodeServers(...args: unknown[]): Promise<Episode>;
}
