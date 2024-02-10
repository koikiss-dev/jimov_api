import { URLSearchParams } from "url";
import {
  IManganatoFilterParams,
  ManganatoFilterURLParams,
  manganatoGenreList,
  manganatoOrderByOptions,
  manganatoOrderByOptionsList,
} from "../ManganatoTypes";
import { ManganatoManager } from "./ManganatoManager";

export class ManganatoAdvancedSearchURLManager extends ManganatoManager {
  private readonly baseURL = "https://manganato.com/advanced_search";
  private readonly separator = " ";

  private splitGenresToArray(genres: string) {
    return genres.split(this.separator);
  }

  private processGenres(genresArray: string[]): number[] {
    const arrGenerated: number[] = [];

    for (const genre of genresArray) {
      if (manganatoGenreList[genre.toLowerCase()])
        arrGenerated.push(manganatoGenreList[genre.toLowerCase()]);
      else continue;
    }

    return arrGenerated;
  }

  private formatGenres(genresProcessedArray: number[]) {
    return `_${genresProcessedArray.join("_")}_`;
  }

  private processStatus(status: unknown) {
    return typeof status === "string" &&
      (status.toLowerCase() === "ongoing" ||
        status.toLowerCase() === "completed")
      ? status
      : "";
  }

  private processOrderBy(order: unknown) {
    return typeof order === "string" &&
      manganatoOrderByOptionsList.includes(
        order.toLowerCase() as manganatoOrderByOptions,
      )
      ? order
      : "";
  }

  generate(params: Partial<IManganatoFilterParams>) {
    const urlParamsObject = {
      s: "all",
      g_i: "",
      sts: this.processStatus(params.sts),
      orby: this.processOrderBy(params.orby),
      page: params.page ? params.page.toString() : "",
    } satisfies Record<ManganatoFilterURLParams, string>;

    if (params.genres) {
      const splitted = this.splitGenresToArray(params.genres);
      const processed = this.processGenres(splitted);

      urlParamsObject.g_i = this.formatGenres(processed);
    }

    const urlParams = new URLSearchParams(urlParamsObject);

    return `${this.baseURL}?${urlParams.toString()}`;
  }
}
