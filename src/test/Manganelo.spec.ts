import { Manganelo } from '../scraper/sites/manga/manganelo/Manganelo';
import { IManganatoFilterParams, manganatoGenreList } from '../scraper/sites/manga/manganelo/ManganatoTypes';

type ManganeloTestTemplate = {
  id: string;
  title: string;
  status: "ongoing" | "completed";
  nsfw: boolean;
};

type ManganeloGenresOptions = keyof typeof manganatoGenreList;

interface ManganeloFilterTestTemplate extends Omit<IManganatoFilterParams, "genres"> {
  genres: ManganeloGenresOptions[];
};

type ManganeloChapterTestTemplate = {
  id: string;
  num: number;
};

describe('Manganelo', () => {
  let manganelo: Manganelo;

  beforeEach(() => {
    manganelo = new Manganelo();
  });

  it('should get manga info successfully', async () => {

    const testsSuites: ManganeloTestTemplate[] = [
      {
        id: 'md990312',
        nsfw: false,
        status: 'ongoing',
        title: 'Your Eternal Lies'
      },
      {
        id: 'he984887',
        nsfw: false,
        status: 'ongoing',
        title: 'The Peerless Sword God'
      },
      {
        id: 'go983949',
        nsfw: false,
        status: 'ongoing',
        title: 'Bite Into Me'
      },
      {
        id: 'oj992266',
        nsfw: true,
        status: 'ongoing',
        title: 'Dekiai Osananajimi Ha Watashi No Otto De Stalker!?'
      }
    ];

    testsSuites.forEach(async (options) => {
      const mangaInfo = await manganelo.GetMangaInfo(options.id);
      expect(mangaInfo.title).toStrictEqual(options.title);

      if (mangaInfo.altTitles)
        expect(mangaInfo.altTitles.length).toBeGreaterThanOrEqual(1);

      if (mangaInfo.thumbnail && mangaInfo.thumbnail.url)
        expect(mangaInfo.thumbnail.url).toContain('.jpg');

      expect(mangaInfo.status).toStrictEqual(options.status);
      expect(mangaInfo.isNSFW).toStrictEqual(options.nsfw);

      if (mangaInfo.genres)
        expect(mangaInfo.genres.length).toBeGreaterThanOrEqual(1);

      if (mangaInfo.chapters)
        expect(mangaInfo.chapters.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should filter manga successfully', async () => {
    const filterTestsSuites: ManganeloFilterTestTemplate[] = [
      {
        genres: ['action'],
        orby: 'az',
        page: 3,
        sts: 'completed'
      },
      {
        genres: ['drama', 'romance'],
        orby: 'newest',
        page: 1,
        sts: 'ongoing'
      }
    ];

    filterTestsSuites.forEach(async (options) => {
      const result = await manganelo.Filter({
        genres: options.genres.join(' '),
        orby: options.orby,
        page: options.page,
        sts: options.sts
      });

      expect(result.results.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should return manga chapters successfully', async () => {
    const chapterTestsSuites: ManganeloChapterTestTemplate[] = [
      {
        id: 'he984887',
        num: 221
      },
      {
        id: 'oj992266',
        num: 1
      },
      {
        id: 'md990312',
        num: 79
      },
      {
        id: 'go983949',
        num: 2
      }
    ];

    chapterTestsSuites.forEach(async (options) => {
      const result = await manganelo.GetMangaChapters(options.id, options.num);

      expect(result.images.length).toBeGreaterThanOrEqual(1);
    });
  });
});
