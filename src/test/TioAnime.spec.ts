import { TioAnime } from '../scraper/sites/anime/tioanime/TioAnime'

describe("TioAnime", () => {
  let tioanime: TioAnime;

  beforeEach(() => {
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

  /*it('should get episode servers successfully', async () => {
    const episodeServers = await tioanime.getEpisodeServers('https://tioanime.com/ver/isekai-nonbiri-nouka-9');
    expect(episodeServers.length).toBeGreaterThan(0);
    for (let i = 0; i < episodeServers.length; i++) {
      const server = episodeServers[i];
      expect(server.name.length).toBeGreaterThan(0);
      if (server.file_url != undefined && server.file_url != null) {
        expect(server.file_url.length).toBeGreaterThan(0);
      }
    }
  });

  it('should filter anime successfully', async () => {
    const result = await tioanime.filter("", ["1"], ["accion"], { begin: 1950, end: 2023 }, 2, "recent");
    expect(result.results.length).toBeGreaterThan(0);
  });*/
})
