import { Monoschinos } from "../scraper/sites/anime/monoschinos/Monoschinos";

describe("Monoschinos", () => {
  let monos: Monoschinos;

  beforeEach(() => {
    monos = new Monoschinos();
  });
  it("should get anime info successfully", async () => {
    const animeInfo = await monos.getAnime(
      "https://monoschinos2.com/anime/one-room-hiatari-futsuu-tenshi-tsuki-sub-espanol",
    );

    expect(animeInfo.name).toBe("Date A Live");
    expect(animeInfo.image.url).toContain(".jpg");
    expect(animeInfo.synopsis?.length).toBeGreaterThan(0);
    expect(animeInfo.chronology?.length).toBeGreaterThan(0);
    expect(animeInfo.genres?.length).toBeGreaterThan(0);
    expect(animeInfo.episodes?.length).toBeGreaterThan(0);
    expect((await monos.getLastAnimes()).length).toBeGreaterThan(0);
    expect((await monos.getLastEpisodes()).length).toBeGreaterThan(0);
    //expect((await monos.getEpisodeServers('https://tioanime.com/ver/isekai-nonbiri-nouka-9')).length).toBeGreaterThan(0);
  });
});