import { Comick } from "../scraper/sites/manga/comick/Comick";

describe("AnimeLatinohd", () => {
    let comick: Comick;
  
    beforeEach(() => {
        comick = new Comick();
    });
  
    it("should get anime info successfully", async () => {
      const mangaInfo = await comick.GetMangaInfo("00-solo-leveling","en");
      expect(mangaInfo?.title).toBe("Solo Leveling");
      expect(mangaInfo?.altTitles).toContain("我独自升级");
      expect(mangaInfo?.thumbnail?.url).toContain(".jpg");
      expect(mangaInfo?.status).toBe("ongoing");
      expect(mangaInfo?.authors?.length).toBeGreaterThan(0);
      expect(mangaInfo?.genres?.length).toBeGreaterThan(0);
      expect(mangaInfo?.chapters?.length).toBeGreaterThan(0);
    });
  
    it("should filter anime successfully", async () => {
      const result = await comick.GetMangaByFilter();
      expect(result.results.length).toBeGreaterThan(0);
    }, 10000);
  });