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

            const ResultList: IResultSearch<IMangaResult> = {
                results: []
            }
            data.map((e: { id: any; title: any; md_covers: { b2key: string; }[]; slug: any; }, _i: any) => {
                const ListMangaResult: IMangaResult = {
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
            const { data } = await axios.get(`${this.api}/comic/${manga}`);

            const currentLang = lang ? `?lang=${lang}` : ""

            const mangaInfoParseObj = data



            //https://comick.app/_next/data/Ut35IGvJuQU3g2jzrGDk-/comic/naruto-rocket-doujinshi.json?slug=naruto-rocket-doujinshi
            const dataApi = await axios.get(`${this.api}/comic/${mangaInfoParseObj.comic.hid}/chapters${currentLang}`);


            const MangaInfo: Manga = {
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
                const mindate = new Date(e.created_at);
                const langChapter = currentLang ? currentLang : "?lang=" + e.lang

                const MangaInfoChapter: MangaChapter = {
                    id: e.id,
                    title: e.title,
                    url: `/manga/comick/chapter/${e.hid}-${mangaInfoParseObj.comic.slug}-${e.chap ? e.chap : "err"}${langChapter}`,
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

            const currentLang = lang ? "-" + lang : "-en";
            const hid = manga.substring(0, manga.indexOf("-"));
            const idTitle = manga.substring(manga.indexOf("-") + 1);
            var idNumber = idTitle.substring(idTitle.lastIndexOf("-") + 1);
            const title = idTitle.substring(0, idTitle.lastIndexOf("-"));

            let urlchange = ""

            if (idNumber != "err") {
                urlchange = `${hid}-chapter-${idNumber}${currentLang}`
            } else {
                urlchange = hid
            }

            const { data } = await axios.get(`${this.url}/comic/${title}/${urlchange}`);
            const $ = cheerio.load(data);

            if (idNumber != "err") {
                const mangaChapterInfoParseObj = JSON.parse($("#__NEXT_DATA__").html()).props.pageProps
                const mindate = new Date(mangaChapterInfoParseObj.chapter.created_at);

                const MangaChapterInfoChapter: MangaChapter = {
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
                        year: mindate.getFullYear() ? mindate.getFullYear() : null,
                        month: null,
                        day: null
                    }
                }
                return MangaChapterInfoChapter;

            } else {
                let buildid = JSON.parse($("#__NEXT_DATA__").html()).buildId

                let dataBuild = await axios.get(`${this.url}/_next/data/${buildid}/comic/${title}/${hid}.json?slug=${title}&chapter=${hid}`);

                const mindate = new Date(dataBuild.data.pageProps.chapter.created_at);

                const MangaChapterInfoChapter: MangaChapter = {
                    id: dataBuild.data.pageProps.chapter.id,
                    title: dataBuild.data.pageProps.chapter.title,
                    url: `/manga/comick/chapter/`,
                    number: dataBuild.data.pageProps.chapter.chap,
                    images: dataBuild.data.pageProps.chapter.md_images.map((s: { w: any; h: any; name: any; b2key: string; }, _i: any) => {
                        return {
                            width: s.w,
                            height: s.h,
                            name: s.name,
                            image: "https://meo.comick.pictures/" + s.b2key
                        }
                    }),
                    cover: "https://meo.comick.pictures/" + dataBuild.data.pageProps.chapter.md_comics.md_covers[0].b2key,
                    date: {
                        year: mindate.getFullYear() ? mindate.getFullYear() : null,
                        month: null,
                        day: null
                    }
                }

                return MangaChapterInfoChapter;
                
            }
        } catch (error) {
        }
    }

}


