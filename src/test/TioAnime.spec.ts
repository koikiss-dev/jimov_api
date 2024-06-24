import { TioAnime } from "../scraper/sites/anime/tioanime/TioAnime";

describe("TioAnime", () => {
  let tioanime: TioAnime;

  beforeEach(() => {
    tioanime = new TioAnime();
  });
  it("should get anime info successfully", async () => {
    const animeInfo = await tioanime.getAnime(
      "https://tioanime.com/anime/date-a-live",
    );

    expect(animeInfo.name).toBe("Date A Live");
    expect(animeInfo.image.url).toMatch(/\.jpg$/);
    expect(animeInfo.synopsis?.length).toBeGreaterThan(0);
    expect(animeInfo.chronology?.length).toBeGreaterThan(0);
    expect(animeInfo.genres?.length).toBeGreaterThan(0);
    expect(animeInfo.episodes?.length).toBeGreaterThan(0);
    expect((await tioanime.getLastAnimes(null)).length).toBeGreaterThan(0);
    expect((await tioanime.getLastEpisodes()).length).toBeGreaterThan(0);
    expect((await tioanime.getLastMovies()).length).toBeGreaterThan(0);
    expect((await tioanime.getLastOnas()).length).toBeGreaterThan(0);
    expect((await tioanime.getLastOvas()).length).toBeGreaterThan(0);
    expect((await tioanime.getEpisodeServers('https://tioanime.com/ver/date-a-live-1')).length).toBeGreaterThan(0);
  });
});


/*async function test() {
  let tioanime: TioAnime;
  tioanime = new TioAnime();
  const animeInfo = await tioanime.getAnime(
    "https://tioanime.com/anime/date-a-live",
  );

  console.log('> Name: ')
  console.log(animeInfo.name);
  console.log('> Image url: ')
  console.log(animeInfo.image.url);
  console.log('> Synopsis length: ')
  console.log(animeInfo.synopsis?.length);
  console.log('> Chronology length: ')
  console.log(animeInfo.chronology?.length);
  console.log('> Genres length: ')
  console.log(animeInfo.genres?.length);
  console.log('> Episodes length: ')
  console.log(animeInfo.episodes?.length);
  console.log('> function getLastAnimes(): ')
  console.log((await tioanime.getLastAnimes(null)).length);
  console.log('> function getLastEpisodes(): ')
  console.log((await tioanime.getLastEpisodes()).length);
  console.log('> function getLastMovies(): ')
  console.log((await tioanime.getLastMovies()).length);
  console.log('> function getLastOnas(): ')
  console.log((await tioanime.getLastOnas()).length);
  console.log('> function getLastOvas(): ')
  console.log((await tioanime.getLastOvas()).length);
  console.log('> function getEpisodeServers(): ')
  console.log((await tioanime.getEpisodeServers('https://tioanime.com/ver/isekai-nonbiri-nouka-9')).length);
}

test();*/