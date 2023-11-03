import { Router } from "express";
import { Manganato } from "../../../../scraper/sites/manga/manganato/Manganato";

const router = Router();
const manganato = new Manganato();

router.get("/manga/manganato/title/:id", async (req, res) => {
  const result = await manganato.GetMangaInfo(
    req.params.id as unknown as string,
  );

  return res.status(200).send(result);
});

router.get("/manga/manganato/filter", async (req, res) => {
  const result = await manganato.Filter({
    sts: req.query.status as unknown as string,
    genres: req.query.genres as unknown as string,
    orby: req.query.order as unknown as string,
    page: req.query.page as unknown as number
  });

  return res.status(200).send(result);
})

router.get("/manga/manganato/chapter/:id", async (req, res) => {
  const result = await manganato.GetMangaChapters(req.params.id as unknown as string, req.query.num as unknown as number);

  return res.status(200).send(result);
});

export default router;
