import { HentaiLa } from "../scraper/sites/anime/hentaila/HentaiLa";

describe("AnimeLatinohd", () => {
  let hentaila: HentaiLa;

  beforeEach(() => {
    hentaila = new HentaiLa();
  });

  it("should get anime info successfully", async () => {
    const animeInfo = await hentaila.GetItemInfo("hentai-korashime-2");
    expect(animeInfo.name).toBe("Korashime 2");
    expect(animeInfo.image.url).toContain(".jpg");
    expect(animeInfo.status).toBe("Finalizado");
    expect(animeInfo.synopsis?.length).toBeGreaterThan(0);
    expect(animeInfo.genres?.length).toBeGreaterThan(0);
    expect(animeInfo.episodes?.length).toBeGreaterThan(0);
  });

  it("should filter anime successfully", async () => {
    const result = await hentaila.GetItemByFilter("na");
    expect(result.results.length).toBeGreaterThan(0);
  }, 10000);
});
