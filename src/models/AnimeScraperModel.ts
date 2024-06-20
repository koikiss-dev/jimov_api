import type { AnimeMedia } from "@animetypes/anime";
import type { Episode } from "@animetypes/episode";
import type { IAnimeResult } from "@animetypes/search";
import { BaseScraperModel } from "./BaseScraperModel";

export abstract class AnimeScraperModel extends BaseScraperModel<AnimeMedia, IAnimeResult> {
  public abstract GetEpisodeServers(...args: unknown[]): Promise<Episode>;
}
