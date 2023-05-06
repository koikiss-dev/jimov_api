import { Nhentai } from "../../src/scraper/sites/manga/nhentai/Nhentai";


describe('It returns a list of animes related that name filter', () => {

  it('it should match that fields', async () => {
    const mangasHentais = await new Nhentai().filter("Evangelion");

    expect(mangasHentais[0].id).toBe("403447");
    expect(mangasHentais[0].title).toBe("[Cassino (Magarikouji Lily)] Playboys (2) – Neon Genesis Evangelion dj [Eng]");

  })

  it('it should return a manga information from manga id', async () => {
    const getMangaInfo: any = await new Nhentai().getMangaInfo("403447");

    expect(getMangaInfo.title).toEqual("[Cassino (Magarikouji Lily)] Playboys (2) – Neon Genesis Evangelion dj [Eng]");
    expect(getMangaInfo.id).toEqual("403447");

  })

  it('it should return a manga chapters from manga id', async () => {

    const getMangaChapters: any = await new Nhentai().getMangaChapters("403447");
    expect(getMangaChapters[0].images[0]).toEqual("https://cdn.dogehls.xyz/galleries/2223278/1t.jpg")

  })


})
