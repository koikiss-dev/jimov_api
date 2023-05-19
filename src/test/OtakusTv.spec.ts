import { ICalendar } from "../types/date";
import { OtakusTv } from "./../scraper/sites/anime/otakusTv/OtakusTv";

describe("Test the Otakustv functionality", () => {
  let otakusService: OtakusTv;

  beforeEach(() => {
    otakusService = new OtakusTv();
  });

  it("it should return a information about a manga", async () => {
    const animeInfo = await otakusService.getAnimeInfo("goblin-slayer");

    expect(animeInfo.name).toEqual("Goblin Slayer");
    expect(animeInfo.status).toEqual("Finalizado");
    expect(animeInfo.date).toEqual<ICalendar>({
      year: 2018,
      day: 7,
      month: 10,
    });
    expect(animeInfo.episodes.length).toBe(13);
    expect(animeInfo.chronology?.length).toBe(3);
  });

  it("it should return the servers related to episode", async () => {
    const episodeInfo = await otakusService.getEpisodeServers(
      "goblin-slayer",
      "episodio-12"
    );

    expect(episodeInfo.name).toEqual("El destino de un aventurero");
    expect(episodeInfo.number).toBe(12);
    expect(episodeInfo.url).toBe("/anime/otakustv/episode/goblin-slayer/episodio-12");
    expect(episodeInfo.servers?.length).toBe(1);
  });
});
