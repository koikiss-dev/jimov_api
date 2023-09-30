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

export class MangaReader {
  readonly url = "https://mangareader.to";

  private async GetMangaVolumeRange(mangaId: number) {
    const { data } = await axios.get(`${this.url}/a-${mangaId}`);
    const $ = load(data);

    const rangeResult: number[] = $("div.volume-list-ul div.manga_list div.manga_list-wrap")
      .find("div.item")
      .map((_, element) => {
        const mangaVolumeTitle = $(element)
          .find("div.manga-poster span.tick-item")
          .text()
          .trim();
        return Number(mangaVolumeTitle.split(" ").at(-1));
      }).get();

    return rangeResult;
  }

  private async GetSpecificMangaChapterName(
    mangaId: number,
    chapterNumber: number,
    language: typeof MangaReaderFilterLanguage[number],
    type: MangaReaderChapterType
  ): Promise<string> {
    const { data } = await axios.get(`${this.url}/a-${mangaId}`);
    const $ = load(data);

    let langCode: typeof MangaReaderFilterLanguage[number] = MangaReaderFilterLanguage[MangaReaderFilterLanguage.indexOf(language)] || "";

    let result = ``;
    let chapterItemHtmlTag = ``;
    let chapterTitleHtmlTag = ``;
    let chapterTitleMatch = ``;

    if (type === "chapter") {
      chapterItemHtmlTag = `#${langCode}-chapters li.chapter-item`;
      chapterTitleHtmlTag = `a.item-link span.name`;
      chapterTitleMatch = `Chapter ${chapterNumber}:`;
    } else if (type === "volume") {
      chapterItemHtmlTag = `#${langCode}-volumes div.item`;
      chapterTitleHtmlTag = `div.manga-poster span.tick-vol`;
      chapterTitleMatch = `VOL ${chapterNumber}`;
    }

    const chapters = $(chapterItemHtmlTag);

    if (!chapters.length) throw new Error("Chapters doesn't found.");

    const chaptersTitle: string[] = chapters.find(chapterTitleHtmlTag).map((_, element) => $(element).text().trim()).get();

    for (let title of chaptersTitle) {
      if (title.includes(chapterTitleMatch)) {
        result = title;
        break;
      }
    }

    return result;
  }

  private async GetMangaPages(chapterId: string, type: MangaReaderChapterType) {
    let idType = "";

    if (type === "chapter") idType = "chap";
    else if (type === "volume") idType = "vol";

    const { data: pagesAjaxData } = await axios.get(`${this.url}/ajax/image/list/${idType}/${chapterId}?mode=horizontal&quality=high`);
    const $pagesAjaxData = load(pagesAjaxData.html);
    const pagesSection = $pagesAjaxData("div#main-wrapper div.container-reader-hoz div#divslide div.divslide-wrapper div.ds-item").find("div.ds-image")

    let pages = pagesSection.map((_, element) => $pagesAjaxData(element).attr("data-url")).get();

    return pages;
  }

  async GetMangaInfo(mangaId: number): Promise<Manga> {
    try {
      const { data } = await axios.get(`${this.url}/a-${mangaId}`);
      const { data: charactersAjaxList } = await axios.get(`${this.url}/ajax/character/list/${mangaId}`);

      const $ = load(data);
      const $characterListAjaxResult = load(charactersAjaxList.html);

      const charactersSection = $characterListAjaxResult("div.character-list div.cl-item div.cli-info");

      const title = $("h2.manga-name").text().trim();
      const altTitle = $("div.manga-name-or").text().trim() ? Array.of($("div.manga-name-or").text().trim()) : null;
      const thumbnailUrl = $("div.manga-poster img.manga-poster-img").attr(
        "src"
      );
      const description = $("div.description").text().trim();
      const status = $("div.anisc-info div.item")
        .find("span.name")
        .first()
        .text()
        .trim();

      // Manga genres
      const mangaGenres: Array<string> = $("div.genres").find("a").map((_, element) => $(element).text().trim()).get();

      const manga = new Manga();

      manga.id = mangaId.toString();
      manga.title = title;
      manga.altTitles = altTitle;
      manga.thumbnail = new Image(thumbnailUrl);
      manga.description = description || null;

      if (status === "Finished") manga.status = "completed";
      else manga.status = "ongoing";

      manga.genres = mangaGenres;

      if (charactersSection.html()) {
        const characters = charactersSection.find("h4.cl-name a").map((_, element) => $characterListAjaxResult(element).text().trim()).get();
        manga.characters = characters;
      } else manga.characters = null;

      // Get manga chapters
      manga.chapters = [];
      const mangaChapterItemSection = $(
        "div.chapters-list-ul ul.ulclear"
      );
      let langCode: string = ``;

      if (mangaChapterItemSection?.first().attr("id"))
        langCode = mangaChapterItemSection.first().attr("id").split("-")[0];

      mangaChapterItemSection.first().find("li.chapter-item").each((_, element) => {
        const mangaChapter = new MangaChapter();

        const mangaTitle = $(element)
          .find("a.item-link span.name")
          .text()
          .trim();
        const mangaChapterNumber = mangaTitle.split(" ").at(1).replace(":", "");

        mangaChapter.title = mangaTitle;
        mangaChapter.id = mangaId.toString();
        mangaChapter.url = `/manga/mangareader/chapter/${mangaId.toString()}?number=${mangaChapterNumber}&lang=${langCode}`;
        mangaChapter.images = null;

        manga.chapters.push(mangaChapter);
      });

      // Get manga volumes
      const mangaVolumeRange = await this.GetMangaVolumeRange(mangaId);

      manga.volumes = [];
      const mangaVolumeItemSection = $(
        "div.volume-list-ul div.manga_list div.manga_list-wrap"
      );

      let langVolumeCode: string = ``;

      if (mangaVolumeItemSection?.first().attr("id"))
        langVolumeCode = mangaChapterItemSection
          .first()
          .attr("id")
          .split("-")[0];

      mangaVolumeItemSection.first().find("div.item").each((_, element) => {
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
        mangaVolume.url = `/manga/mangareader/volume/${mangaId.toString()}?number=${mangaVolumeNumber}&lang=${langVolumeCode}`;

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
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay,
      sort,
      numPage
    } = options;
    if (
      startYear <= 0 ||
      startMonth <= 0 ||
      startDay <= 0 ||
      endYear <= 0 ||
      endMonth <= 0 ||
      endDay <= 0 ||
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
        sy: startYear ?? "",
        sm: startMonth ?? "",
        sd: startDay ?? "",
        ey: endYear ?? "",
        em: endMonth ?? "",
        ed: endDay ?? "",
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
        url: `/manga/mangareader/title/${mangaResultsID}`
      });
    });

    return mangaFilterResults;
  }

  async GetMangaChapters(
    mangaId: number,
    chapterNumber: number,
    language: typeof MangaReaderFilterLanguage[number],
    type: MangaReaderChapterType
  ) {
    try {
      const { data } = await axios.get(`${this.url}/read/a-${mangaId}/${language}/${type}-${chapterNumber}`);
      const $ = load(data);

      const chapterId = $('div#wrapper').attr('data-reading-id');

      if (!chapterId) throw new Error("Chapter pages doesn't found.");

      const mangaChapterName = await this.GetSpecificMangaChapterName(
        mangaId,
        chapterNumber,
        language,
        type
      );

      if (type === "chapter") {
        const mangaChapter = new MangaChapter();
        const chapterPages = await this.GetMangaPages(chapterId, "chapter");

        mangaChapter.title = mangaChapterName;
        mangaChapter.id = mangaId;
        mangaChapter.images = chapterPages;
        mangaChapter.number = chapterNumber;
        mangaChapter.url = `/manga/mangareader/chapter/${mangaId.toString()}?number=${chapterNumber}&lang=${language}`;

        return mangaChapter;
      } else {
        const mangaVolume = new MangaVolume();
        const mangaVolumeRange = await this.GetMangaVolumeRange(mangaId);
        const volumePages = await this.GetMangaPages(chapterId, "volume");

        mangaVolume.title = mangaChapterName;
        mangaVolume.id = mangaId;
        mangaVolume.range = [mangaVolumeRange.at(-1), mangaVolumeRange.at(0)];
        mangaVolume.images = volumePages;
        mangaVolume.number = chapterNumber;
        mangaVolume.url = `/manga/mangareader/volume/${mangaId.toString()}?number=${chapterNumber}&lang=${language}`;

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
