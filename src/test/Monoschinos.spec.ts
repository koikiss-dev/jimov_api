import { Monoschinos } from "../scraper/sites/anime/monoschinos/Monoschinos";

describe('Monoschinos', () => {
  let monos: Monoschinos;

  beforeEach(() => {
    monos = new Monoschinos();
  });
  it("should get anime info successfully", async () => {
    const animeInfo = await monos.getAnime(
      'https://monoschinos2.com/anime/one-room-hiatari-futsuu-tenshi-tsuki-sub-espanol',
    );

    expect(animeInfo.name).toBe('Date A Live');
    expect(animeInfo.image.url).toContain('.jpg');
    expect(animeInfo.synopsis?.length).toBeGreaterThan(0);
    // The chronology function does not exist in Monoschinos
    //expect(animeInfo.chronology?.length).toBeGreaterThan(0);
    expect(animeInfo.genres?.length).toBeGreaterThan(0);
    expect(animeInfo.episodes?.length).toBeGreaterThan(0);
    expect((await monos.getLastAnimes()).length).toBeGreaterThan(0);
    expect((await monos.getLastEpisodes()).length).toBeGreaterThan(0);
    expect((await monos.getEpisodeServers('https://monoschinos2.com/ver/one-room-hiatari-futsuu-tenshi-tsuki-episodio-1')).length).toBeGreaterThan(0);
  });
});


/*async function test() {
  let monos: Monoschinos;
  monos = new Monoschinos();

  const animeInfo = await monos.getAnime(
    "https://monoschinos2.com/anime/date-a-live-i-sub-espanol",
  );

  console.log("> Name: ")
  console.log(animeInfo.name)
  console.log("> Image url: ")
  console.log(animeInfo.image.url)
  console.log("> Synopsis length: ")
  console.log(animeInfo.synopsis?.length)
  //console.log("> Chronology length: ")
  //console.log(animeInfo.chronology?.length)
  console.log("> Genres length: ")
  console.log(animeInfo.genres?.length)
  console.log("> Episodes count: ")
  console.log(animeInfo.episodes?.length)

  console.log("> function getLastAnimes(): ")
  console.log((await monos.getLastAnimes()).length)
  console.log("> function getLastAnimes(): ")
  console.log((await monos.getLastEpisodes()).length)
  console.log("> function getEpisodeServers(): ")
  console.log((await monos.getEpisodeServers('https://monoschinos2.com/ver/date-a-live-i-episodio-1')).length)
}

test();*/