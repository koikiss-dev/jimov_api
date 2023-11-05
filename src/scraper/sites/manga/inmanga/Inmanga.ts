import * as cheerio from "cheerio";
import axios from "axios";
import { Manga, MangaChapter, IMangaResult } from "../../../../types/manga"
import { IResultSearch } from "@animetypes/search";

//Default Set Axios Cookie
axios.defaults.withCredentials = true
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.55";

export class Inmanga {
    readonly url = "https://inmanga.com";

    async GetMangaByFilter(search?: string, type?: number, genre?: string[]) {
        try {
            const formdata = new FormData();
            formdata.append("filter[queryString]", search);
            formdata.append("filter[broadcastStatus]", String(type))
            formdata.append("filter[skip]", "0");
            formdata.append("filter[take]", "10");
            const genreList = ['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '-1']

            if (genre) {
                genre.map((e) => {
                    if (genreList.includes(e)) {
                        formdata.append("filter[generes][]", genreList[genreList.indexOf(e)]);
                    }
                })
            } else {
                formdata.append("filter[generes][]", "-1");
            }

            const bodyContent = formdata;
            const { data } = await axios.post(`${this.url}/manga/getMangasConsultResult`, bodyContent);
            const $ = cheerio.load(data);

            const ResultList: IResultSearch<IMangaResult> = {
                results: []
            }

            $("a").each((_i, e) => {
                const idtd = $(e).attr("href").split("/")
                const name = idtd[3]
                const cid = idtd[4]
                const title = $(e).find(".list-group.col-xs-12 .m0.list-group-item.ellipsed-text").text().trim()

                const ListMangaResult: IMangaResult = {
                    id: null,
                    title: title,
                    thumbnail: {
                        url: `https://inmanga.com/thumbnails/manga/${name}/${cid}`
                    },

                    // old version `/manga/inmanga/title/${title.replace(/[^a-zA-Z:]/g, "-")}`
                    url: `/manga/inmanga/title/${name}?cid=${cid}`
                }
                ResultList.results.push(ListMangaResult)
            })

            return ResultList
        } catch (error) {
            console.log(error)
        }
    }

    async GetMangaInfo(manga: string,cid: string): Promise<Manga> {
        try {
            const dataPost = await axios.get(`${this.url}/ver/manga/${manga}/${cid}`);

            console.log(dataPost)
            const $_ = cheerio.load(dataPost.data);


            const MangaInfo: Manga = {
                id: cid,
                title: $_("div.col-md-3.col-sm-4 div.panel-heading.visible-xs").text(),
                altTitles: [],
                url: `/manga/inmanga/title/${manga}`,
                description: $_("body > div > section > div > div > div:nth-child(6) > div > div.panel-body").text().trim(),
                isNSFW: false,
                status: $_(".col-md-3.col-sm-4 .list-group > a:nth-child(1) > span").text() == "En emisión" ? "ongoing" : "completed",
                authors: [],
                genres: [],
                chapters: [],
                thumbnail: {
                    url: `https://inmanga.com/thumbnails/manga/${manga}/${cid}`
                }
            }

            $_(".col-md-9.col-sm-8.col-xs-12 .panel.widget .panel-heading .text-muted span").each((_i, e) => MangaInfo.altTitles.push($_(e).text().replace(";", "")))
            $_(".col-md-9.col-sm-8.col-xs-12 .panel.widget .panel-heading .label.ml-sm").each((_i, e) => MangaInfo.genres.push($_(e).text().trim()))

            MangaInfo.altTitles.slice(MangaInfo.altTitles.indexOf('""'), 0)
            MangaInfo.genres.slice(MangaInfo.genres.indexOf('""'), 0)

            const dataChPost = await axios.get(`${this.url}/chapter/getall?mangaIdentification=${cid}`);
            const dataCh = JSON.parse(dataChPost.data.data);
            dataCh.result.map((e: { Id: number; MangaName: string; Number: number; Identification: string; }) => {
                const MangaInfoChapter: MangaChapter = {
                    id: e.Id,
                    title: e.MangaName,
                    url: `/manga/inmanga/chapter/${manga}-${e.Number}?cid=${e.Identification}`, // Change url (: = title ) manga.replace(/[^a-zA-Z:]/g," ")
                    number: e.Number,
                    images: null,
                    cover: null,
                    date: {
                        year: null,
                        month: null,
                        day: null
                    }
                }
                MangaInfo.chapters.push(MangaInfoChapter);
            })

            return MangaInfo
        } catch (error) {
            console.log(error)
        }
    }

    async GetChapterInfo(manga: string, cid: string) {
        try {
            const title = manga.substring(0, manga.lastIndexOf("-"));
            const idNumber = Number(manga.substring(manga.lastIndexOf("-") + 1));

            const { data } = await axios.get(`${this.url}/chapter/chapterIndexControls?identification=${cid}`)
            const $ = cheerio.load(data);

            const allimages = []

            const MangaChapterInfoChapter: MangaChapter = {
                id: 1,
                title: "",
                url: `/manga/inmanga/chapter/`,
                number: idNumber,
                images: allimages,
                cover: null,
                date: {
                    year: null,
                    month: null,
                    day: null
                }
            }

            $(".p0.col-sm-12.col-xs-12.PagesContainer a").each((_i, e) => {
                const id = $(e).find("img").attr("id")
                const alt = $(e).find("img").attr("alt")
                const page = $(e).find("img").attr("data-pagenumber")

                allimages.push({
                    width: "",
                    height: "",
                    name: alt,
                    url: `https://pack-yak.intomanga.com/images/manga/${title}/chapter/${idNumber}/page/${page}/${id}`
                })
            })

            return MangaChapterInfoChapter;
        } catch (error) {
            console.log(error)
        }
    }

}


