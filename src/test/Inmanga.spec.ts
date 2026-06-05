import { Inmanga } from "../scraper/sites/manga/inmanga/Inmanga";

describe("Inmanga", () => {
  let inmanga: Inmanga;

  beforeEach(() => {
    inmanga = new Inmanga();
  });

  it("should get anime info successfully", async () => {
    const mangaInfo = await inmanga.GetMangaInfo("Kimetsu-no-Yaiba","78352626-0e2c-4b10-9610-28abf57c6881");

    expect(mangaInfo.name).toBe("Kimetsu no Yaiba");
    expect(mangaInfo.alt_names).toContain("Blade of Demon Destruction");

    expect(mangaInfo.status).toBe("ongoing");
  });

  it("should filter anime successfully", async () => {
    const result = await inmanga.GetMangaByFilter();
    expect(result.results.length).toBeGreaterThan(0);
  }, 10000);
});
