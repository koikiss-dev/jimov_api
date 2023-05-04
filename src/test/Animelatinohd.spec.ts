import { AnimeLatinoHD } from "../scraper/sites/anime/animelatinohd/AnimeLatinoHD";

describe("AnimeLatinohd", () => {
  let animelatinohd: AnimeLatinoHD;

  beforeEach(() => {
    animelatinohd = new AnimeLatinoHD();
  });

  it("should get anime info successfully", async () => {
    const animeInfo = await animelatinohd.GetAnimeInfo("wonder-egg-priority");
    expect(animeInfo.name).toBe("Wonder Egg Priority");
    expect(animeInfo.alt_name).toContain("ワンダーエッグ・プライオリティ");
    expect(animeInfo.image.url).toContain(".jpg");
    expect(animeInfo.status).toBe("Finalizado");
    expect(animeInfo.synopsis.length).toBeGreaterThan(0);
    expect(animeInfo.genres.length).toBeGreaterThan(0);
    expect(animeInfo.episodes.length).toBeGreaterThan(0);
  });

  it("should filter anime successfully", async () => {
    const result = await animelatinohd.GetAnimeByFilter();
    expect(result.results.length).toBeGreaterThan(0);
  }, 10000);
});