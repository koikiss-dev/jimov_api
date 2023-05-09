import { Image } from "../../../../types/image";
import {
  IMangaResult,
  Manga,
  MangaChapter,
  MangaVolume
} from "../../../../types/manga";
import axios from "axios";
import { load } from "cheerio";
import {
  MangaReaderFilterLanguage,
  MangaReaderChapterType,
  MangaReaderFilterData
} from "./MangaReaderTypes";
import { IResultSearch, ResultSearch } from "../../../../types/search";
import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from "puppeteer";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import { sleep } from "./assets/sleep";

export class MangaReader {
  readonly url = "https://mangareader.to";

  private async GetMangaVolumeRange(mangaId: number) {
    const { data } = await axios.get(`${this.url}/a-${mangaId}`);
    const $ = load(data);

    const rangeResult: Array<number> = [];

    $("div.volume-list-ul div.manga_list div.manga_list-wrap")
      .find("div.item")
      .each((_, element) => {
        const mangaVolumeTitle = $(element)
          .find("div.manga-poster span.tick-item")
          .text()
          .trim();
        const mangaVolumeNumber = mangaVolumeTitle.split(" ").at(-1);

        rangeResult.push(Number(mangaVolumeNumber));
      });

    return rangeResult;
  }

  private async GetSpecificMangaChapterName(
    mangaId: number,
    chapterNumber: number,
    language: MangaReaderFilterLanguage,
    type: MangaReaderChapterType
  ): Promise<string> {
    const { data } = await axios.get(`${this.url}/a-${mangaId}`);
    const $ = load(data);

    let langCode = ``;
    if (language === MangaReaderFilterLanguage.English)
      langCode = MangaReaderFilterLanguage.English;
    else if (language === MangaReaderFilterLanguage.French)
      langCode = MangaReaderFilterLanguage.French;
    else if (language === MangaReaderFilterLanguage.Korean)
      langCode = MangaReaderFilterLanguage.Korean;
    else if (language === MangaReaderFilterLanguage.Chinese)
      langCode = MangaReaderFilterLanguage.Chinese;
    else if (language === MangaReaderFilterLanguage.Japanese)
      langCode = MangaReaderFilterLanguage.Japanese;

    let result = ``;

    if (type === "chapter") {
      const chapters = $(`#${langCode}-chapters li.chapter-item`);

      if (!chapters.length) throw new Error("Chapters doesn't found.");

      for (let index = 0; index <= chapters.length; index++) {
        const chapterTitle = chapters
          .eq(index)
          .find("a.item-link span.name")
          .text()
          .trim();

        if (chapterTitle.includes(`Chapter ${chapterNumber}:`)) {
          result = chapterTitle;
          break;
        }
      }
    } else if (type === "volume") {
      const volumes = $(`#${langCode}-volumes div.item`);

      if (!volumes.length) throw new Error("Volumes doesn't found.");

      for (let index = 0; index <= volumes.length; index++) {
        const volumeTitle = volumes
          .eq(index)
          .find("div.manga-poster span")
          .text()
          .trim();

        if (volumeTitle.includes(`VOL ${chapterNumber}`)) {
          result = volumeTitle;
          break;
        }
      }
    }

    return result;
  }

  async GetMangaInfo(mangaId: number): Promise<Manga> {
    try {
      const { data } = await axios.get(`${this.url}/a-${mangaId}`);
      const $ = load(data);

      const title = $("h2.manga-name").text().trim();
      const altTitle = $("div.manga-name-or").text().trim();
      const thumbnailUrl = $("div.manga-poster img.manga-poster-img").attr(
        "src"
      );
      const description = $("div.description").text().trim();
      const status = $("div.anisc-info div.item")
        .find("span.name")
        .first()
        .text()
        .trim();

      const mangaGenres: Array<string> = [];
      // Manga genres
      $("div.genres")
        .find("a")
        .each((_, element) => {
          const genreElementName = $(element).text().trim();
          mangaGenres.push(genreElementName);
        });

      const manga = new Manga();

      manga.id = mangaId.toString();
      manga.title = title;
      manga.altTitles = [altTitle] || null;
      manga.thumbnail = new Image(thumbnailUrl);
      manga.description = description || null;

      if (status === "Finished") manga.status = "completed";
      else manga.status = "ongoing";

      manga.genres = mangaGenres;

      // Get manga chapters
      manga.chapters = [];
      $("div.chapters-list-ul ul.ulclear li.chapter-item").each(
        (_, element) => {
          const mangaChapter = new MangaChapter();

          const mangaTitle = $(element)
            .find("a.item-link span.name")
            .text()
            .trim();
          const mangaChapterNumber = mangaTitle
            .split(" ")
            .at(1)
            .replace(":", "");

          mangaChapter.title = mangaTitle;
          mangaChapter.id = mangaId.toString();
          mangaChapter.url = `/manga/mangareader/chapter/${mangaChapterNumber}`;

          manga.chapters.push(mangaChapter);
        }
      );

      // Get manga volumes
      const mangaVolumeRange = await this.GetMangaVolumeRange(mangaId);

      manga.volumes = [];
      $("div.volume-list-ul div.manga_list div.manga_list-wrap")
        .find("div.item")
        .each((_, element) => {
          const mangaVolume = new MangaVolume();

          const mangaVolumeTitle = $(element)
            .find("div.manga-poster span.tick-item")
            .text()
            .trim();
          const mangaVolumeNumber = mangaVolumeTitle.split(" ").at(-1);
          const mangaVolumeThumbnail = $(element)
            .find("div.manga-poster img.manga-poster-img")
            .attr("src");

          mangaVolume.range = [mangaVolumeRange.at(-1), mangaVolumeRange.at(0)];
          mangaVolume.id = mangaId.toString();
          mangaVolume.title = mangaVolumeTitle;
          mangaVolume.number = Number(mangaVolumeNumber);
          mangaVolume.thumbnail = mangaVolumeThumbnail;
          mangaVolume.url = `/manga/mangareader/volume/${mangaVolumeNumber}`;

          manga.volumes.push(mangaVolume);
        });

      if (
        mangaGenres.some(genre => genre === "Hentai" || genre === "Ecchi") ===
        true
      )
        manga.isNSFW = true;
      else manga.isNSFW = false;

      return manga;
    } catch (error) {
      console.log(error);
      throw new Error(
        "I've found an error while trying to get the manga info."
      );
    }
  }

  async Filter(
    options: MangaReaderFilterData
  ): Promise<IResultSearch<IMangaResult>> {
    const {
      type,
      status,
      ratingType,
      score,
      language,
      startDate,
      endDate,
      sort,
      numPage
    } = options;
    if (
      startDate[0] <= 0 ||
      startDate[1] <= 0 ||
      startDate[2] <= 0 ||
      endDate[0] <= 0 ||
      endDate[1] <= 0 ||
      endDate[2] <= 0 ||
      numPage <= 0
    )
      throw new Error("No parameter can be equal to or less than 0.");

    const { data } = await axios.get(`${this.url}/filter`, {
      params: {
        type: type ?? "",
        status: status ?? "",
        rating_type: ratingType ?? "",
        score: score ?? "",
        language: language ?? "",
        sy: startDate[0] ?? "",
        sm: startDate[1] ?? "",
        sd: startDate[2] ?? "",
        ey: endDate[0] ?? "",
        em: endDate[1] ?? "",
        ed: endDate[2] ?? "",
        sort: sort ?? "",
        page: numPage ?? 1
      }
    });

    const $ = load(data);
    const mangaFilterResults = new ResultSearch<IMangaResult>();

    $("div.mls-wrap div.item").each((_, element) => {
      const mangaResultsID = $(element)
        .find("div.manga-detail h3.manga-name a")
        .attr("href")
        .split("-")
        .at(-1);

      const mangaResultsTitle = $(element)
        .find("div.manga-detail h3.manga-name a")
        .text()
        .trim();

      const mangaResultsThumbnail = $(element)
        .find("a.manga-poster img.manga-poster-img")
        .attr("src");

      const mangaResultsTitleUrl = $(element)
        .find("a.manga-poster")
        .attr("href")
        .split("-");

      // removes the last element in the array (manga id)
      mangaResultsTitleUrl.pop();

      mangaFilterResults.results.push({
        id: mangaResultsID,
        title: mangaResultsTitle,
        thumbnail: new Image(mangaResultsThumbnail),
        url: `/manga/mangareader/title/${mangaResultsTitleUrl
          .join("-")
          .replace("/", "")}`
      });
    });

    return mangaFilterResults;
  }

  async GetMangaChapters(
    mangaId: number,
    chapterNumber: number,
    language: MangaReaderFilterLanguage,
    type: MangaReaderChapterType
  ) {
    try {
      puppeteer.use(
        AdblockerPlugin({
          interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
        })
      );

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(
        `${this.url}/read/a-${mangaId}/${language}/${type}-${chapterNumber}`,
        {
          waitUntil: "domcontentloaded"
        }
      );

      await page.setViewport({ width: 1080, height: 1024 });
      const initPageHtml = await page.content();
      const initPage = load(initPageHtml);

      const buttons = initPage(
        "#first-read > div.read-tips > div > div.rtl-rows > a:nth-child(1)"
      );

      if (!buttons.length)
        throw new Error(
          `I could not found pages for this manga ${type}. Try to be more specific in their manga.`
        );

      await page.waitForSelector(".rtl-row", { visible: true });
      const selectors = await page.$$(".rtl-row");
      const lastSelector = selectors.pop();

      await lastSelector.click();
      await sleep(500);
      const html = await page.content();
      await browser.close();

      const mangaChapterName = await this.GetSpecificMangaChapterName(
        mangaId,
        chapterNumber,
        language,
        type
      );

      const $ = load(html);
      const mangaPagesArray: string[] = [];
      const mangaPagesSection = $(
        "#divslide > div.divslide-wrapper > div.ds-item:not(:last-child)"
      );

      if (!mangaPagesSection.length)
        throw new Error("Manga pages doesn't found.");

      // get manga pages
      mangaPagesSection.each((_, element) => {
        const img = $(element).find("div.ds-image").attr("data-url");
        mangaPagesArray.push(img);
      });

      if (type === "chapter") {
        const mangaChapter = new MangaChapter();

        mangaChapter.title = mangaChapterName;
        mangaChapter.id = mangaId;
        mangaChapter.images = mangaPagesArray;
        mangaChapter.number = chapterNumber;
        mangaChapter.url = `/manga/mangareader/chapter/${chapterNumber}`;

        return mangaChapter;
      } else {
        const mangaVolume = new MangaVolume();
        const mangaVolumeRange = await this.GetMangaVolumeRange(mangaId);

        mangaVolume.title = mangaChapterName;
        mangaVolume.id = mangaId;
        mangaVolume.range = [mangaVolumeRange.at(-1), mangaVolumeRange.at(0)];
        mangaVolume.images = mangaPagesArray;
        mangaVolume.number = chapterNumber;
        mangaVolume.url = `/manga/mangareader/volume/${chapterNumber}`;

        return mangaVolume;
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        `I've found an error while trying to get the manga ${type} pages.`
      );
    }
  }
}
