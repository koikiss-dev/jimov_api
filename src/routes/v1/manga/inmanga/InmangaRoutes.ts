import { Router } from "express";
import { Inmanga } from "../../../../scraper/sites/manga/inmanga/Inmanga";
const Manga = new Inmanga();
const router = Router();


router.get("/manga/inmanga/filter", async (req, res) => {
    let { search, type, genre } = req.query;
    let data = await Manga.GetMangaByFilter(search as string, type as unknown as number, genre as string[]);

    res.send(data)
});


router.get("/manga/inmanga/title/:manga", async (req, res) => {
    let { manga } = req.params;

    let data = await Manga.GetMangaInfo(manga);

    res.send(data)
});

router.get("/manga/inmanga/chapter/:chapter", async (req, res) => {

    let { chapter } = req.params
    let { cid } = req.query
    let data = await Manga.GetChapterInfo(chapter, cid as string);

    res.send(data)
});
export default router