import { MangaReader } from "../scraper/sites/manga/MangaReader/MangaReader";
import {
  MangaReaderFilterSort,
  MangaReaderChapterType,
  MangaReaderFilterType,
  MangaReaderFilterScore,
  MangaReaderFilterStatus,
  MangaReaderFilterLanguage,
  MangaReaderFilterRatingType
} from "../scraper/sites/manga/MangaReader/MangaReaderTypes";

describe("MangaReader", () => {
  let mangareader: MangaReader;

  beforeEach(() => {
    mangareader = new MangaReader();
  });

  it("should return manga info successfully", async () => {
    const testsList: Array<{ name: string; id: number; mangaName: string; altName: string[]; mangaGenres: string[]; isNsfw: boolean; status: "ongoing" | "completed"; hasVolumes: boolean, hasChapters: boolean }> = [
      { name: "zashisu", id: 65961, mangaName: "Zashisu", altName: ["ザシス"], mangaGenres: ["Horror", "Mystery", "Psychological", "School", "Seinen"], isNsfw: false, status: "ongoing", hasVolumes: false, hasChapters: true },
      { name: "mitsuba-no-monogatari", id: 65941, mangaName: "Mitsuba no Monogatari", altName: ["みつばものがたり 呪いの少女と死の輪舞《ロンド》"], mangaGenres: ["Fantasy"], isNsfw: false, status: "ongoing", hasVolumes: false, hasChapters: true },
      { name: "akuyaku-reijou-ni-tensei-suru-no-mahou-ni-muchuu-de-itara-ouji-ni-dekiaisaremashita", id: 65795, mangaName: "Akuyaku Reijou ni Tensei suru no Mahou ni Muchuu de Itara Ouji ni Dekiaisaremashita", altName: ["悪役令嬢に転生するも魔法に夢中でいたら王子に溺愛されました"], mangaGenres: ["Fantasy", "Romance", "School", "Shoujo"], isNsfw: false, status: "ongoing", hasVolumes: false, hasChapters: true },
      { name: "my-star-is-the-lewdest", id: 65879, mangaName: "My Star Is the Lewdest", altName: ["俺の女優が一番淫ら"], mangaGenres: ["Comedy", "Ecchi"], isNsfw: true, status: "ongoing", hasVolumes: false, hasChapters: true },
      { name: "hoop-days", id: 65789, mangaName: "Hoop Days", altName: ["ディアボーイズ"], mangaGenres: ["Drama", "Slice of Life", "Sports"], isNsfw: false, status: "completed", hasVolumes: false, hasChapters: true },
    ];

    testsList.forEach(async fields => {
      const { name, id, mangaName, altName, mangaGenres, isNsfw, status, hasVolumes, hasChapters } = fields;
      const mangaInfo = await mangareader.GetMangaInfo(name, id);

      expect(mangaInfo.title).toStrictEqual(mangaName);
      expect(mangaInfo.altTitles).toStrictEqual(altName);
      expect(mangaInfo.isNSFW).toStrictEqual(isNsfw);
      expect(mangaInfo.genres).toStrictEqual(mangaGenres);
      expect(mangaInfo.status).toStrictEqual(status);

      if (hasChapters === true) expect(mangaInfo.chapters?.length).toBeGreaterThanOrEqual(1);
      else expect(mangaInfo.chapters?.length).toStrictEqual(0);

      if (hasVolumes === true) expect(mangaInfo.volumes?.length).toBeGreaterThanOrEqual(1);
      else expect(mangaInfo.volumes?.length).toStrictEqual(0);
    });
  });

  it("should return manga filter successfully", async () => {
    const testsList: Array<{
      hasResults: boolean;
      type?: MangaReaderFilterType;
      status?: MangaReaderFilterStatus;
      ratingType?: MangaReaderFilterRatingType;
      score?: MangaReaderFilterScore;
      language?: MangaReaderFilterLanguage;
      startYear?: number;
      startMonth?: number;
      startDay?: number;
      endYear?: number;
      endMonth?: number;
      endDay?: number;
      sort?: MangaReaderFilterSort
    }> = [
        {
          hasResults: true,
          type: MangaReaderFilterType.Manhwa,
          status: MangaReaderFilterStatus.Finished,
          ratingType: MangaReaderFilterRatingType.MildNudity
        },
        {
          hasResults: true,
          type: MangaReaderFilterType.Doujinshi,
          status: MangaReaderFilterStatus.All,
          ratingType: MangaReaderFilterRatingType.Teens,
          score: MangaReaderFilterScore.Horrible,
          language: MangaReaderFilterLanguage.Japanese
        },
        {
          hasResults: true,
          type: MangaReaderFilterType.Manga,
          status: MangaReaderFilterStatus.Finished,
          ratingType: MangaReaderFilterRatingType.Teens,
          score: MangaReaderFilterScore.All,
          language: MangaReaderFilterLanguage.Japanese,
          startYear: 2021,
          startMonth: 3,
          startDay: 5,
          endYear: 2023,
          endMonth: 3,
          endDay: 6
        },
        {
          hasResults: false,
          type: MangaReaderFilterType.LightNovel,
          status: MangaReaderFilterStatus.Finished,
          ratingType: MangaReaderFilterRatingType.Children,
          score: MangaReaderFilterScore.All,
          language: MangaReaderFilterLanguage.English,
        },
        {
          hasResults: false,
          type: MangaReaderFilterType.OneShot,
          status: MangaReaderFilterStatus.All,
          ratingType: MangaReaderFilterRatingType.Teens,
          score: MangaReaderFilterScore.VeryGood,
          language: MangaReaderFilterLanguage.English,
        },
      ];

    testsList.forEach(async fields => {
      const {
        hasResults,
        type,
        status,
        ratingType,
        score,
        language,
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay
      } = fields;

      const filter = await mangareader.Filter(
        type,
        status,
        ratingType,
        score,
        language,
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay
      );

      if (hasResults === true) expect(filter.length).toBeGreaterThanOrEqual(1);
      else expect(filter.length).toStrictEqual(0);
    });
  });

  it("should return manga chapters successfully", async () => {
    const testsList: Array<{ name: string, id: number, type: MangaReaderChapterType }> = [
      { name: "moto-akuyaku-reijou-to-s-kyuu-boukensha-no-honobono-machi-kurashi", id: 65953, type: "chapter" },
      { name: "erotical-wizard-with-twelve-brides", id: 65989, type: "chapter" },
      { name: "omiai-shitakunakattanode-muri-nandai-na-jouken-wo-tsuketara-doukyuusei-ga-kita-ken-ni-tsuite", id: 65981, type: "chapter" },
      { name: "the-diary-of-a-sage-around-40-living-in-another-world-carefree-another-world-teacher-life", id: 65955, type: "volume" },
      { name: "kissing-the-flower-in-bloom", id: 65781, type: "volume" },
    ];

    testsList.forEach(async fields => {
      const { name, id, type } = fields;
      const mangaChapters = await mangareader.GetMangaChapters(name, id, type);

      expect(mangaChapters?.length).toBeGreaterThanOrEqual(1);
    });
  });
});
