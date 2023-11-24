import { Comick } from "../scraper/sites/manga/comick/Comick";

describe("Comick", () => {
  let comick: Comick;

  beforeEach(() => {
    comick = new Comick();
  });

  it("should get anime info successfully", async () => {
    const mangaInfo = await comick.GetMangaInfo("00-solo-leveling", "en");
    
    expect(mangaInfo.title).toBe("Solo Leveling");
    expect(mangaInfo.altTitles).toContain("我独自升级");
    expect(mangaInfo.status).toBe("completed");

  });

  it("should filter anime successfully", async () => {
    const result = await comick.GetMangaByFilter();
    expect(result.results.length).toBeGreaterThan(0);
  }, 10000);
});