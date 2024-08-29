import { AnimeFlv } from "../scraper/sites/anime/animeflv/AnimeFlv";
import { AnimeMedia } from "../types/anime";
import { Episode } from "../types/episode";
import {
  Genres,
  StatusAnimeflv,
} from "../scraper/sites/anime/animeflv/animeflv_helper";

describe("AnimeFlv", () => {
  let animeFlv: AnimeFlv;

  beforeEach(() => {
    animeFlv = new AnimeFlv();
  });

  it("should get anime info successfully", async () => {
    const animeInfo: AnimeMedia =
      await animeFlv.GetItemInfo("25jigen-no-ririsa");
    expect(animeInfo.name).toBe("Wonder Egg Priority");
    expect(animeInfo.alt_names).toContain("ワンダーエッグ・プライオリティ");
    expect(animeInfo.image.url).toContain(".jpg");
    expect(animeInfo.status).toBe("Finalizado");
    expect(animeInfo.synopsis?.length).toBeGreaterThan(0);
    expect(animeInfo.chronology?.length).toBeGreaterThan(0);
    expect(animeInfo.genres?.length).toBeGreaterThan(0);
    expect(animeInfo.episodes?.length).toBeGreaterThan(0);
  });

  it("should filter anime successfully", async () => {
    const result = await animeFlv.GetItemByFilter(
      Genres.Action,
      "all",
      "all",
      StatusAnimeflv.OnGoing,
      1,
      1
    );
    expect(result.results.length).toBeGreaterThan(0);
  });

  it("should get episode servers successfully", async () => {
    const episode: Episode = await animeFlv.GetEpisodeServers(
      "wonder-egg-priority-01"
    );
    expect(episode.name).toBeTruthy();
    expect(episode.url).toContain("/anime/flv/episode/wonder-egg-priority-01");
    expect(episode.num).toBe(1);
    expect(episode?.servers?.length).toBeGreaterThan(0);
  });
});
