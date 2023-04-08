import {AnimeFlv} from '../scraper/sites/anime/animeflv/AnimeFlv';
import { StatusAnimeflv, Genres } from '../scraper/sites/anime/animeflv/animeflv_helper';
describe('AnimeFlv', () => {
    let animeFlv: AnimeFlv;
  
    beforeEach(() => {
      animeFlv = new AnimeFlv();
    });
  
    it('should get anime info successfully', async () => {
      const animeInfo = await animeFlv.GetAnimeInfo('wonder-egg-priority');
      expect(animeInfo.name).toBe('Wonder Egg Priority');
      expect(animeInfo.alt_name).toContain('ワンダーエッグ・プライオリティ');
      expect(animeInfo.image.url).toContain('.jpg');
      expect(animeInfo.status).toBe('En emision');
      expect(animeInfo.synopsis.length).toBeGreaterThan(0);
      expect(animeInfo.chronology?.length).toBeGreaterThan(0);
      expect(animeInfo.genres.length).toBeGreaterThan(0);
      expect(animeInfo.episodes.length).toBeGreaterThan(0);
    });
  
    it('should filter anime successfully', async () => {
      const result = await animeFlv.Filter(Genres.Action, 'all', 'all', StatusAnimeflv.OnGoing, 1, 1);
      expect(result.results.length).toBeGreaterThan(0);
    });
  });