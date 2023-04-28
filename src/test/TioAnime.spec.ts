import { TioAnime } from '../scraper/sites/anime/tioanime/TioAnime'

describe("TioAnime", () => {
    let tioanime: TioAnime;

    beforeEach(()=> {
        tioanime = new TioAnime();
    })
     it('should get anime info successfully', async () => {
      const animeInfo = await tioanime.getAnime('https://tioanime.com/anime/date-a-live');
     
      expect(animeInfo.name).toBe('Date A Live');
      expect(animeInfo.image.url).toContain('.jpg');
      expect(animeInfo.synopsis.length).toBeGreaterThan(0);
      expect(animeInfo.chronology?.length).toBeGreaterThan(0);
      expect(animeInfo.genres.length).toBeGreaterThan(0);
      expect(animeInfo.episodes.length).toBeGreaterThan(0);
    });
    it('should filter anime successfully', async () => {
      const result = await tioanime.filter(["1"], ["accion"], { begin: 1950, end: 2023 }, 2, "recent");
      expect(result.results.length).toBeGreaterThan(0);
    }, 10000);
})
