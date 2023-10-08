import { Router } from "express";
import { MangaReader } from "../../../../scraper/sites/manga/MangaReader/MangaReader";
import {
  MangaReaderFilterLanguage,
  MangaReaderFilterRatingType,
  MangaReaderFilterScore,
  MangaReaderFilterSort,
  MangaReaderFilterStatus,
  MangaReaderFilterType
} from "../../../../scraper/sites/manga/MangaReader/MangaReaderTypes";

const mangaReader = new MangaReader();
const router = Router();

router.get("/manga/mangareader/title/:id", async (req, res) => {
  try {
    const id = req.params.id as unknown as number;

    const data = await mangaReader.GetMangaInfo(id);

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/manga/mangareader/filter", async (req, res) => {
  try {
    const type = req.query.type as MangaReaderFilterType;
    const status = req.query.status as MangaReaderFilterStatus;
    const ratingType = req.query.rating as MangaReaderFilterRatingType;
    const score = req.query.score as MangaReaderFilterScore;
    const language = req.query.language as typeof MangaReaderFilterLanguage[number];
    const startYear = req.query.startyear as unknown as number;
    const startMonth = req.query.startmonth as unknown as number;
    const startDay = req.query.startday as unknown as number;
    const endMonth = req.query.endmonth as unknown as number;
    const endYear = req.query.endyear as unknown as number;
    const endDay = req.query.endday as unknown as number;
    const sort = req.query.sort as MangaReaderFilterSort;
    const numPage = req.query.page as unknown as number;

    const data = await mangaReader.Filter({
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
    });

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/manga/mangareader/chapter/:id", async (req, res) => {
  try {
    const id = req.params.id as unknown as number;
    const chapterNumber = req.query.number as unknown as number;
    const language = req.query.lang as typeof MangaReaderFilterLanguage[number];


    const data = await mangaReader.GetMangaChapters(
      id,
      chapterNumber,
      language,
      "chapter"
    );

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/manga/mangareader/volume/:id", async (req, res) => {
  try {
    const id = req.params.id as unknown as number;
    const chapterNumber = req.query.number as unknown as number;
    const language = req.query.lang as typeof MangaReaderFilterLanguage[number];


    const data = await mangaReader.GetMangaChapters(
      id,
      chapterNumber,
      language,
      "volume"
    );

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

export default router;
