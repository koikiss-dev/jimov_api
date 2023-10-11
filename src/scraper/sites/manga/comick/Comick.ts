import * as cheerio from "cheerio";
import axios from "axios";
import { Manga, MangaChapter, IMangaResult } from "@animetypes/manga";
import { IResultSearch } from "@animetypes/search";

//Default Set Axios Cookie
axios.defaults.withCredentials = true
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G532G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/12.0 Chrome/79.0.3945.136 Mobile Safari/537.36";

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
                        year: mindate.getFullYear() ? mindate.getFullYear() : null,
                        month: mindate.getMonth() ? mindate.getMonth() : null,
                        day: mindate.getDay() ? mindate.getDay() : null
                    }
                }
                return MangaInfo.chapters.push(!langChapter.includes("?lang=id") ? MangaInfoChapter : null)
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

            let urlchange = ""

            if (idNumber != "err") {
                urlchange = `${hid}-chapter-${idNumber}${currentLang}`
            } else {
                urlchange = hid
            }

            const { data } = await axios.get(`${this.url}/comic/${title}/${urlchange}`);
            const $ = cheerio.load(data);

            if (JSON.parse($("#__NEXT_DATA__").html()).isFallback = false) {
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
                        month: mindate.getMonth() ? mindate.getMonth() : null,
                        day: mindate.getDay() ? mindate.getDay() : null
                    }
                }
                return MangaChapterInfoChapter;

            } else {
                let buildid = JSON.parse($("#__NEXT_DATA__").html()).buildId
                let currentUrl = idNumber == "err" ? `${title}/${hid}.json?slug=${title}&chapter=${hid}` : `${title}/${hid}-chapter-${idNumber}${currentLang}.json?slug=${title}&chapter=${hid}-chapter-${idNumber}${currentLang}`
                let dataBuild = await axios.get(`${this.url}/_next/data/${buildid}/comic/${currentUrl}`);

                let mindate = new Date(dataBuild.data.pageProps.chapter.created_at);

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
                        month: mindate.getMonth() ? mindate.getMonth() : null,
                        day: mindate.getDay() ? mindate.getDay() : null
                    }
                }

                return MangaChapterInfoChapter;

            }
        } catch (error) {
        }
    }

}


