import { ManganatoAdvancedSearchURLManager } from "./managers/ManganatoURLManager";

export class ManganatoManagerUtils {
  private static instance: ManganatoManagerUtils;
  readonly url: ManganatoAdvancedSearchURLManager = new ManganatoAdvancedSearchURLManager();

  static get Instance() {
    if (!this.instance) this.instance = new ManganatoManagerUtils();

    return this.instance;
  }
}
