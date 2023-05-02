import { NhentaiFilter } from "../../src/scraper/sites/manga/nhentai/Nhentai";


describe('It returns a list of animes related that name filter', () => {

  it('it should match that fields', async () => {
  const nhentai = new NhentaiFilter();

  const mangasHentais = await nhentai.Filter("evangelion")

  expect(mangasHentais[0].id).toBe("403447");
  expect(mangasHentais[0].title).toBe("[Cassino (Magarikouji Lily)] Playboys (2) – Neon Genesis Evangelion dj [Eng]");


  })
})
