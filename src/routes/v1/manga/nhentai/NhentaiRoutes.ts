import { Router } from "express";
import { Nhentai } from "../../../../scraper/sites/manga/nhentai/Nhentai";

const router = Router();

router.get("/manga/nhentai/filter/:mangaName", async (request, response) => {
  try {
    const { mangaName } = request.params;
    const rawPage = request.query.page;
    const page =
      typeof rawPage === "string" && /^\d+$/.test(rawPage)
        ? parseInt(rawPage, 10)
        : undefined;

    const nhentai = await new Nhentai().filter(mangaName, page);
    response.send(nhentai);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/manga/nhentai/info/:mangaId", async (request, response) => {
  try {
    const { mangaId } = request.params;
    const nhentai = await new Nhentai().getMangaInfo(mangaId);
    response.send(nhentai);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/manga/nhentai/chapters/:mangaId", async (request, response) => {
  try {
    const { mangaId } = request.params;
    const nhentai = await new Nhentai().getMangaChapters(mangaId);
    response.send(nhentai);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
