/* import type { BaseMedia, BaseResult } from "@animetypes/base";
import type { IResultSearch } from "@animetypes/search"; */

import { BaseMedia, BaseResult } from "../types/base";
import { IResultSearch } from "../types/search";

export abstract class BaseScraperModel<MediaInfoType extends BaseMedia, FilterResultType extends BaseResult> {
  public abstract readonly url: string;

  public abstract GetItemInfo(item: string): Promise<MediaInfoType>;
  public abstract GetItemByFilter(...args: unknown[]): Promise<IResultSearch<FilterResultType>>;
}
