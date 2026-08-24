import axios from "axios";
import { Nhentai } from "../scraper/sites/manga/nhentai/Nhentai";
import { clearGalleryCache } from "../scraper/sites/manga/nhentai/assets/galleryClient";

describe("Nhentai", () => {
  let nhentai: Nhentai;

  beforeEach(() => {
    clearGalleryCache();
    nhentai = new Nhentai();
  });

  it("should download a gallery only once between info and chapters", async () => {
    const spy = jest.spyOn(axios, "get");
    try {
      await new Nhentai().getMangaInfo("650873");
      await new Nhentai().getMangaChapters("650873");

      const galleryCalls = spy.mock.calls.filter(([url]) =>
        String(url).includes("/g/650873")
      );

      expect(galleryCalls.length).toBe(1);
    } finally {
      spy.mockRestore();
    }
  }, 20000);

  it("should get manga info successfully", async () => {
    const mangaInfo = await nhentai.getMangaInfo("650873");

    expect(mangaInfo.id).toBe("650873");
    expect(mangaInfo.url).toBe("/manga/nhentai/name/650873");
    expect(mangaInfo.name).toContain("Idol Nakayoshi Time P52");

    expect(mangaInfo.thumbnail).toBeDefined();
    expect(mangaInfo.thumbnail.url).toContain("zrocdn.xyz/galleries/");

    expect(mangaInfo.authors).toContain("testa");
    expect(mangaInfo.characters).toContain("kaoru ryuzaki");
    expect(mangaInfo.characters).toContain("mary cochran");
    expect(mangaInfo.genres.length).toBeGreaterThanOrEqual(1);

    expect(mangaInfo.nsfw).toBe(true);
  }, 15000);

  it("should filter manga successfully", async () => {
    const results = await nhentai.filter("test");

    // 'test' has more than the 16 pages the old pagination logic
    // detected, so a complete search must return well past that cap
    // (25 results per page).
    expect(results.length).toBeGreaterThan(400);

    const first = results[0];
    expect(first.id).toBeDefined();
    expect(first.name).toBeTruthy();
    expect(first.url).toMatch(/^\/manga\/nhentai\/title\/\d+$/);
    expect(first.thumbnail.url).toContain("http");
  }, 60000);

  it("should filter a single page of results successfully", async () => {
    const results = await nhentai.filter("test", 2);

    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.length).toBeLessThanOrEqual(25);

    const ids = new Set(results.map((result) => result.id));
    expect(ids.size).toBe(results.length);
  }, 30000);

  it("should filter manga with special characters successfully", async () => {
    const results = await nhentai.filter("testa kitchen");

    expect(results.length).toBeGreaterThanOrEqual(1);
  }, 60000);

  it("should return an empty list when the query has no results", async () => {
    const results = await nhentai.filter("zzzqqqxxx111");

    expect(results).toEqual([]);

    const pagedResults = await nhentai.filter("zzzqqqxxx111", 3);

    expect(pagedResults).toEqual([]);
  }, 30000);

  it("should return an empty list when the page is out of range", async () => {
    const results = await nhentai.filter("test", 99999);

    expect(results).toEqual([]);
  }, 30000);

  it("should reject when the gallery does not exist", async () => {
    await expect(nhentai.getMangaInfo("999999999")).rejects.toThrow();
    await expect(nhentai.getMangaChapters("999999999")).rejects.toThrow();
  }, 30000);

  it("should build jpg urls for galleries stored as jpg", async () => {
    // Gallery 589612 stores its pages as jpg (not webp)
    const chapters = await nhentai.getMangaChapters("589612");

    expect(chapters.length).toBe(1);
    expect(chapters[0].images.length).toBeGreaterThan(0);

    for (const image of chapters[0].images) {
      expect(image).toMatch(
        /^https:\/\/zrocdn\.xyz\/galleries\/\d+\/\d+\.jpg$/
      );
    }
  }, 15000);

  it("should return full-size chapter images successfully", async () => {
    const chapters = await nhentai.getMangaChapters("650873");

    expect(chapters.length).toBe(1);

    const chapter = chapters[0];
    expect(chapter.num).toBe(1);
    expect(chapter.url).toBe("/manga/nhentai/chapter/1");
    expect(chapter.images.length).toBeGreaterThan(0);
    expect(chapter.name).toContain("Idol Nakayoshi Time P52");

    expect(chapter.date).toBeDefined();
    expect(typeof chapter.date.year).toBe("number");

    for (const image of chapter.images) {
      expect(image).toMatch(/^https:\/\/zrocdn\.xyz\/galleries\/\d+\/\d+\.\w+$/);
      expect(image).not.toMatch(/t\.\w+$/);
    }
  }, 15000);
});
