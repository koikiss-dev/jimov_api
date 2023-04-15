import {Zoro} from '../scraper/sites/anime/zoro/Zoro'

describe("Zoro", () => {
    let zoro: Zoro;

    beforeEach(()=> {
        zoro = new Zoro();
    })
     it('should get anime info successfully', async () => {
      const animeInfo = await zoro.GetAnimeInfo('tokyo-ghoul-790');
      expect(animeInfo.name).toBe('Tokyo Ghoul');
      expect(animeInfo.alt_name).toContain('東京喰種-トーキョーグール-');
      expect(animeInfo.image.url).toContain('.jpg');
      expect(animeInfo.synopsis.length).toBeGreaterThan(0);
      expect(animeInfo.chronology?.length).toBeGreaterThan(0);
      expect(animeInfo.genres.length).toBeGreaterThan(0);
    });
    it('should filter anime successfully', async () => {
      const result = await zoro.Filter("2");
      expect(result.results.length).toBeGreaterThan(0);
    });
})
