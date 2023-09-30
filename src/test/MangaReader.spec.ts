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
    const testsList: Array<{
      id: number;
      mangaName: string;
      altName: string[];
      mangaGenres: string[];
      isNsfw: boolean;
      status: "ongoing" | "completed";
      hasVolumes: boolean;
      hasChapters: boolean;
    }> = [
        {
          id: 65961,
          mangaName: "Zashisu",
          altName: ["ザシス"],
          mangaGenres: ["Horror", "Mystery", "Psychological", "School", "Seinen"],
          isNsfw: false,
          status: "ongoing",
          hasVolumes: false,
          hasChapters: true
        },
        {
          id: 65941,
          mangaName: "Mitsuba no Monogatari",
          altName: ["みつばものがたり 呪いの少女と死の輪舞《ロンド》"],
          mangaGenres: ["Fantasy"],
          isNsfw: false,
          status: "ongoing",
          hasVolumes: false,
          hasChapters: true
        },
        {
          id: 65795,
          mangaName:
            "Akuyaku Reijou ni Tensei suru no Mahou ni Muchuu de Itara Ouji ni Dekiaisaremashita",
          altName: ["悪役令嬢に転生するも魔法に夢中でいたら王子に溺愛されました"],
          mangaGenres: ["Fantasy", "Romance", "School", "Shoujo"],
          isNsfw: false,
          status: "ongoing",
          hasVolumes: false,
          hasChapters: true
        },
        {
          id: 65879,
          mangaName: "My Star Is the Lewdest",
          altName: ["俺の女優が一番淫ら"],
          mangaGenres: ["Comedy", "Ecchi"],
          isNsfw: true,
          status: "ongoing",
          hasVolumes: false,
          hasChapters: true
        },
        {
          id: 65789,
          mangaName: "Hoop Days",
          altName: ["ディアボーイズ"],
          mangaGenres: ["Drama", "Slice of Life", "Sports"],
          isNsfw: false,
          status: "completed",
          hasVolumes: false,
          hasChapters: true
        }
      ];

    testsList.forEach(async fields => {
      const {
        id,
        mangaName,
        altName,
        mangaGenres,
        isNsfw,
        status,
        hasVolumes,
        hasChapters
      } = fields;
      const mangaInfo = await mangareader.GetMangaInfo(id);

      expect(mangaInfo.title).toStrictEqual(mangaName);
      expect(mangaInfo.altTitles).toStrictEqual(altName);
      expect(mangaInfo.isNSFW).toStrictEqual(isNsfw);
      expect(mangaInfo.genres).toStrictEqual(mangaGenres);
      expect(mangaInfo.status).toStrictEqual(status);

      if (hasChapters === true)
        expect(mangaInfo.chapters?.length).toBeGreaterThanOrEqual(1);
      else expect(mangaInfo.chapters?.length).toStrictEqual(0);

      if (hasVolumes === true)
        expect(mangaInfo.volumes?.length).toBeGreaterThanOrEqual(1);
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
      language?: typeof MangaReaderFilterLanguage[number];
      startYear?: number;
      startMonth?: number;
      startDay?: number;
      endYear?: number;
      endMonth?: number;
      endDay?: number;
      sort?: MangaReaderFilterSort;
      numPage?: number;
    }> = [
        {
          hasResults: true,
          type: MangaReaderFilterType.Manhwa,
          status: MangaReaderFilterStatus.Finished,
          ratingType: MangaReaderFilterRatingType.MildNudity,
          numPage: 1
        },
        {
          hasResults: true,
          type: MangaReaderFilterType.Doujinshi,
          status: MangaReaderFilterStatus.All,
          ratingType: MangaReaderFilterRatingType.Teens,
          score: MangaReaderFilterScore.Horrible,
          language: "ja"
        },
        {
          hasResults: true,
          type: MangaReaderFilterType.Manga,
          status: MangaReaderFilterStatus.Finished,
          ratingType: MangaReaderFilterRatingType.Teens,
          score: MangaReaderFilterScore.All,
          language: "ja",
          startYear: 2021,
          startMonth: 3,
          startDay: 5,
          endYear: 2023,
          endMonth: 3,
          endDay: 6
        },
        {
          hasResults: true,
          type: MangaReaderFilterType.OneShot,
          status: MangaReaderFilterStatus.All,
          ratingType: MangaReaderFilterRatingType.Teens,
          numPage: 2
        },
        {
          hasResults: false,
          type: MangaReaderFilterType.LightNovel,
          status: MangaReaderFilterStatus.Finished,
          ratingType: MangaReaderFilterRatingType.Children,
          score: MangaReaderFilterScore.All,
          language: "en",
          numPage: 3
        },
        {
          hasResults: false,
          type: MangaReaderFilterType.OneShot,
          status: MangaReaderFilterStatus.All,
          ratingType: MangaReaderFilterRatingType.Teens,
          score: MangaReaderFilterScore.VeryGood,
          language: "en",
          numPage: 1
        }
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
        endDay,
        sort,
        numPage
      } = fields;

      const filter = await mangareader.Filter({
        type: type,
        status: status,
        ratingType: ratingType,
        score: score,
        language: language,
        startYear: startYear,
        startMonth: startMonth,
        startDay: startDay,
        endYear: endYear,
        endMonth: endMonth,
        endDay: endDay,
        sort: sort,
        numPage: numPage
      });

      if (hasResults === true)
        expect(filter.results.length).toBeGreaterThanOrEqual(1);
      else expect(filter.results.length).toStrictEqual(0);
    });
  });

  it("should return manga chapter pages successfully", async () => {
    const testsList: Array<{
      chapterTitle: string;
      id: number;
      chapterNumber: number;
      language: typeof MangaReaderFilterLanguage[number];
      type: MangaReaderChapterType;
    }> = [
        {
          chapterTitle: "Chapter 3: 第 3 話",
          id: 65953,
          chapterNumber: 3,
          language: "ja",
          type: "chapter"
        },
        {
          chapterTitle: "VOL 2",
          id: 65781,
          chapterNumber: 2,
          language: "en",
          type: "volume"
        }
      ];

    testsList.forEach(async fields => {
      const { chapterTitle, id, chapterNumber, language, type } = fields;
      const mangaChapters = await mangareader.GetMangaChapters(
        id,
        chapterNumber,
        language,
        type
      );

      expect(mangaChapters?.images.length).toBeGreaterThanOrEqual(1);
      expect(mangaChapters?.title).toStrictEqual(chapterTitle);
      expect(mangaChapters?.id).toStrictEqual(id);
      expect(mangaChapters?.number).toStrictEqual(chapterNumber);
    });
  }, 5000);
});
