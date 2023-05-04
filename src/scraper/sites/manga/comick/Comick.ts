import * as cheerio from "cheerio";
import axios from "axios";
import { Manga, MangaChapter, IMangaResult } from "../../../../types/manga";
import { IResultSearch } from "@animetypes/search";
export class Comick {
    readonly url = "https://comick.app";
    readonly api = "https://api.comick.app"

    async GetMangaByFilter(search?: string, type?: number, year?: string, genre?: string) {
        try {
            const { data } = await axios.get(`${this.api}/v1.0/search`, {
                params: {
                    q: search,
                    type: type,
                    year: year,
                    genre: genre,
                }
            });

            let ResultList: IResultSearch<IMangaResult> = {
                results: []
            }
            data.map((e: { id: any; title: any; md_covers: { b2key: string; }[]; slug: any; }, _i: any) => {
                let ListMangaResult: IMangaResult = {
                    id: e.id,
                    title: e.title,
                    thumbnail: {
                        url: "https://meo.comick.pictures/" + e.md_covers[0].b2key
                    },
                    url: `/manga/comick/title/${e.slug}`
                }
                ResultList.results.push(ListMangaResult)
            })

            return ResultList
        } catch (error) {

        }
    }

    async GetMangaInfo(manga: string, lang: string): Promise<Manga> {
        try {
            const { data } = await axios.get(`${this.url}/comic/${manga}`);
            const $ = cheerio.load(data);

            let currentLang = lang ? `?lang=${lang}` : ""
            let mangaInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps
            let dataApi = await axios.get(`${this.api}/comic/${mangaInfoParseObj.comic.hid}/chapters${currentLang}`);


            let MangaInfo: Manga = {
                id: mangaInfoParseObj.comic.id,
                title: mangaInfoParseObj.comic.title,
                altTitles: mangaInfoParseObj.comic.md_titles.map((e: { title: any; }, _i: any) => e.title),
                url: `/manga/comick/title/${mangaInfoParseObj.comic.slug}`,
                description: mangaInfoParseObj.comic.desc,
                isNSFW: mangaInfoParseObj.comic.hentai,
                status: mangaInfoParseObj.comic.status == "1" ? "ongoing" : "completed",
                authors: mangaInfoParseObj.authors.map((e: { name: any; }, _i: any) => e.name),
                genres: mangaInfoParseObj.genres.map((e: { name: any; }, _i: any) => e.name),
                chapters: [],
                thumbnail: {
                    url: "https://meo.comick.pictures/" + mangaInfoParseObj.comic.md_covers[0].b2key
                }
            }

            dataApi.data.chapters.map((e: { id: any; title: any; hid: any; chap: any; created_at: any; lang: any; }, _i: any) => {
                let mindate = new Date(e.created_at);
                let langChapter = currentLang ? currentLang : "?lang=" + e.lang
                let MangaInfoChapter: MangaChapter = {
                    id: e.id,
                    title: e.title,
                    url: `/manga/comick/chapter/${e.hid}-${mangaInfoParseObj.comic.slug}-${e.chap}${langChapter}`,
                    number: e.chap,
                    images: null,
                    cover: null,
                    date: {
                        year: mindate.getFullYear(),
                        month: null,
                        day: null
                    }
                }
                return MangaInfo.chapters.push(MangaInfoChapter)
            })

            return MangaInfo
        } catch (error) {
        }
    }

    async GetChapterInfo(manga: string, lang: string) {
        try {

            let currentLang = lang ? "-" + lang : "-en";
            let hid = manga.substring(0, manga.indexOf("-"));
            let idTitle = manga.substring(manga.indexOf("-") + 1);
            let idNumber = idTitle.substring(idTitle.lastIndexOf("-") + 1);
            let title = idTitle.substring(0, idTitle.lastIndexOf("-"));

            //https://comick.app/_next/data/geGERMF1d3wyN2FCesUvE/comic/00-eleceed/3mwkO-chapter-1-en.json?slug=00-eleceed&chapter=3mwkO-chapter-1-en

            const { data } = await axios.get(`${this.url}/comic/${title}/${hid}-chapter-${idNumber}${currentLang}`);
            const $ = cheerio.load(data);

            let mangaChapterInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps
            let mindate = new Date(mangaChapterInfoParseObj.chapter.created_at);

            let MangaChapterInfoChapter: MangaChapter = {
                id: mangaChapterInfoParseObj.chapter.id,
                title: mangaChapterInfoParseObj.chapter.title,
                url: `/manga/comick/chapter/`,
                number: mangaChapterInfoParseObj.chapter.chap,
                images: mangaChapterInfoParseObj.chapter.md_images.map((e, _i) => {
                    return {
                        width: e.w,
                        height: e.h,
                        name: e.name,
                        image: "https://meo.comick.pictures/" + e.b2key
                    }
                }),
                cover: "https://meo.comick.pictures/" + mangaChapterInfoParseObj.chapter.md_comics.md_covers[0].b2key,
                date: {
                    year: mindate.getFullYear(),
                    month: null,
                    day: null
                }
            }
            return MangaChapterInfoChapter;
        } catch (error) {
        }
    }

}


