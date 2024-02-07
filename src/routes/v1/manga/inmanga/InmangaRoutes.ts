import { Router } from "express";
import { Inmanga } from "../../../../scraper/sites/manga/inmanga/Inmanga";
const Manga = new Inmanga();
const router = Router();


router.get("/manga/inmanga/filter", async (req, res) => {
    const { search, type, genre } = req.query;
    const data = await Manga.GetMangaByFilter(search as string, type as unknown as number, genre as string[]);

    res.send(data)
});


router.get("/manga/inmanga/title/:manga", async (req, res) => {
    const { manga } = req.params;
    const {cid} = req.query;

    const data = await Manga.GetMangaInfo(manga, cid as string);

    res.send(data)
});

router.get("/manga/inmanga/chapter/:chapter", async (req, res) => {

    const { chapter } = req.params
    const { cid } = req.query
    const data = await Manga.GetChapterInfo(chapter, cid as string);

    res.send(data)
});
export default router