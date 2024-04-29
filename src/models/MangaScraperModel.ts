import type { IMangaResult, Manga, MangaChapter, MangaVolume } from "@animetypes/manga";
import { BaseScraperModel } from "./BaseScraperModel";

export abstract class MangaScraperModel extends BaseScraperModel<Manga, IMangaResult> {
  public abstract GetMangaChapters(...args: unknown[]): Promise<MangaChapter | MangaVolume>
}
