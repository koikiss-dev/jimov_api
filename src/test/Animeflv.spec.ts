import { AnimeFlv } from "../scraper/sites/anime/animeflv/AnimeFlv";
import { AnimeMedia } from "../types/anime";
/* import { Episode } from "../types/episode";
import {
  Genres,
  StatusAnimeflv,
} from "../scraper/sites/anime/animeflv/animeflv_helper"; */
import {
  Genres,
  StatusAnimeflv,
} from "../scraper/sites/anime/animeflv/animeflv_helper";

describe("AnimeFlv test", () => {
  let animeFlv: AnimeFlv;

  beforeEach(() => {
    animeFlv = new AnimeFlv();
  });

  test("should get anime info successfully", async () => {
    const animeInfo: AnimeMedia = await animeFlv.GetItemInfo("horimiya-piece");

    const alt_names_expected: string[] = ["Horimiya: Piece"];
    const genres_expected: string[] = ["Escolares", "Romance", "Shounen"];

    expect(animeInfo.name).toBe("Horimiya: Piece");
    expect(animeInfo.alt_names).toEqual(
      expect.arrayContaining(alt_names_expected)
    );
    expect(animeInfo.image.url).toContain(".jp");
    expect(animeInfo.synopsis).toBe(
      "Historias del manga no adaptadas en el anime principal."
    );
    expect(animeInfo.chronology?.length).toBeGreaterThanOrEqual(0);
    expect(animeInfo.genres).toEqual(expect.arrayContaining(genres_expected));
    expect(animeInfo.episodes?.length).toBeGreaterThanOrEqual(12);
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

  /* it("should filter anime successfully", async () => {
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
  }); */
});
