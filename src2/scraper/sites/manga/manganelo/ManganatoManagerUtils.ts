import { ManganatoAdvancedSearchURLManager } from "./managers/ManganatoURLManager";

export class ManganatoManagerUtils {
  private static instance: ManganatoManagerUtils;
  readonly url: ManganatoAdvancedSearchURLManager =
    new ManganatoAdvancedSearchURLManager();

  private constructor() {}

  static get Instance() {
    if (!ManganatoManagerUtils.instance)
      ManganatoManagerUtils.instance = new ManganatoManagerUtils();

    return ManganatoManagerUtils.instance;
  }
}
