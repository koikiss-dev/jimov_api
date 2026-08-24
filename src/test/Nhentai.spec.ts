import { Nhentai } from "../scraper/sites/manga/nhentai/Nhentai";

describe("Nhentai", () => {
  let nhentai: Nhentai;

  beforeEach(() => {
    nhentai = new Nhentai();
  });

  it("should get manga info successfully", async () => {
    const mangaInfo = await nhentai.getMangaInfo("650873");

    expect(mangaInfo.id).toBe("650873");
    expect(mangaInfo.url).toBe("/manga/nhentai/name/650873");
    expect(mangaInfo.name).toContain("Idol Nakayoshi Time P52");

    expect(mangaInfo.thumbnail).toBeDefined();
    expect(mangaInfo.thumbnail.url).toContain("zrocdn.xyz/galleries/");

    expect(mangaInfo.authors.length).toBeGreaterThanOrEqual(1);
    expect(mangaInfo.characters.length).toBeGreaterThanOrEqual(1);
    expect(mangaInfo.genres.length).toBeGreaterThanOrEqual(1);

    expect(mangaInfo.nsfw).toBe(true);
  }, 15000);

  it("should filter manga successfully", async () => {
    const results = await nhentai.filter("test");

    expect(results.length).toBeGreaterThanOrEqual(1);

    const first = results[0];
    expect(first.id).toBeDefined();
    expect(first.name).toBeTruthy();
    expect(first.url).toMatch(/^\/manga\/nhentai\/title\/\d+$/);
    expect(first.thumbnail.url).toContain("http");
  }, 30000);

  it("should return full-size chapter images successfully", async () => {
    const chapters = await nhentai.getMangaChapters("650873");

    expect(chapters.length).toBe(1);

    const chapter = chapters[0];
    expect(chapter.num).toBe(1);
    expect(chapter.url).toBe("/manga/nhentai/chapter/1");
    expect(chapter.images.length).toBeGreaterThan(0);

    for (const image of chapter.images) {
      expect(image).toMatch(/^https:\/\/zrocdn\.xyz\/galleries\/\d+\/\d+\.\w+$/);
      expect(image).not.toMatch(/t\.\w+$/);
    }
  }, 15000);
});
