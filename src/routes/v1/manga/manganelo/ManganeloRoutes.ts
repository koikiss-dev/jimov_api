import { manganatoOrderByOptionsList } from "@providers/manganelo/ManganatoTypes";
import { Router } from "express";
import { Manganelo } from "../../../../scraper/sites/manga/manganelo/Manganelo";

const router = Router();
const manganelo = new Manganelo();

router.get(`/manga/${manganelo.name}/title/:id`, async (req, res) => {
  const result = await manganelo.GetMangaInfo(
    req.params.id as unknown as string,
  );

  return res.status(200).send(result);
});

router.get(`/manga/${manganelo.name}/filter`, async (req, res) => {
  const result = await manganelo.Filter({
    sts: req.query.status as unknown as "ongoing" | "completed",
    genres: req.query.genres as unknown as string,
    orby: req.query.order as unknown as typeof manganatoOrderByOptionsList[number],
    page: req.query.page as unknown as number
  });

  return res.status(200).send(result);
})

router.get(`/manga/${manganelo.name}/chapter/:id`, async (req, res) => {
  const result = await manganelo.GetMangaChapters(req.params.id as unknown as string, req.query.num as unknown as number);

  return res.status(200).send(result);
});

export default router;
