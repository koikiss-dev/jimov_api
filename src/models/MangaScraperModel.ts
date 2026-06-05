/* import type { MangaMedia, MangaChapter, MangaVolume, IMangaResult } from "@animetypes/manga"; */
import { IMangaResult, MangaChapter, MangaMedia, MangaVolume } from "../types/manga";
import { BaseScraperModel } from "./BaseScraperModel";

export abstract class MangaScraperModel extends BaseScraperModel<MangaMedia, IMangaResult> {
  public abstract GetMangaChapters(...args: unknown[]): Promise<MangaChapter | MangaVolume>
}
