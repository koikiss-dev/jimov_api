import { HentaiHaven } from "../scraper/sites/anime/hentaihaven/HentaiHaven";

describe("HentaiHaven", () => {
  let hentaihaven: HentaiHaven;

  beforeEach(() => {
    hentaihaven = new HentaiHaven();
  });

  it("should get anime info successfully", async () => {
    const animeInfo = await hentaihaven.GetItemInfo("tokubetsu-jugyou-2");
    expect(animeInfo.name).toBe("Tokubetsu Jugyou 2");
    expect(animeInfo.image.url).toContain(".jpg");
    expect(animeInfo.synopsis?.length).toBeGreaterThan(0);
    expect(animeInfo.genres?.length).toBeGreaterThan(0);
    expect(animeInfo.episodes?.length).toBeGreaterThan(0);
  });

  it("should filter anime successfully", async () => {
    const result = await hentaihaven.GetItemByFilter("animation");
    expect(result.results.length).toBeGreaterThan(0);
  }, 10000);
});
