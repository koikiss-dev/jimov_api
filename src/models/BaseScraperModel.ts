import type { IResultSearch } from "@animetypes/search";

export abstract class BaseScraperModel<InfoType, FilterType> {
  public abstract readonly url: string;

  public abstract GetItemInfo(item: string): Promise<InfoType>;
  public abstract GetItemByFilter(...args: unknown[]): Promise<IResultSearch<FilterType>>;
}
