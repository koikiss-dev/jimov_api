import { Nhentai } from "../../src/scraper/sites/manga/nhentai/Nhentai";
import { IMangaChapter, IMangaResult, Manga } from "../types/manga";

describe("It returns a list of animes related that name filter", () => {
  it("it should match that fields", async () => {
    const mangasHentai: IMangaResult[] = await new Nhentai().filter(
      "Evangelion",
    );

    expect(mangasHentai[0].id).toBe("403447");
    expect(mangasHentai[0].title).toBe(
      "[Cassino (Magarikouji Lily)] Playboys (2) – Neon Genesis Evangelion dj [Eng]",
    );
  });
});

describe("Manga info tests", () => {
  it("it should return a manga information from manga id", async () => {
    const getMangaInfo: Manga = await new Nhentai().getMangaInfo("403447");

    expect(getMangaInfo.title).toEqual(
      "[Cassino (Magarikouji Lily)] Playboys (2) – Neon Genesis Evangelion dj [Eng]",
    );
    expect(getMangaInfo.id).toEqual("403447");
  });
});

describe("Manga chapters", () => {
  it("it should return a manga chapters from manga id", async () => {
    const getMangaChapters: IMangaChapter[] =
      await new Nhentai().getMangaChapters("403447");
    expect(getMangaChapters[0].images[0]).toEqual(
      "https://t7.nhentai.net/galleries/2223278/1t.jpg",
    );
  });
});
