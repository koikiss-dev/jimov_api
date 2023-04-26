import { Image } from "../../../../types/image";
import { Manga, MangaChapter, MangaSearch, MangaVolume } from "../../../../types/manga";
import axios from "axios";
import { load } from "cheerio";
import {
  MangaReaderChapterType,
  MangaReaderFilterLanguage,
  MangaReaderFilterRatingType,
  MangaReaderFilterScore,
  MangaReaderFilterSort,
  MangaReaderFilterStatus,
  MangaReaderFilterType
} from "./MangaReaderTypes";

export class MangaReader {
  readonly url = "https://mangareader.to";

  async GetMangaInfo(mangaName: string, mangaId: number): Promise<Manga> {
    try {
      const { data } = await axios.get(`${this.url}/${mangaName}-${mangaId}`);
      const $ = load(data);

      const title = $("h2.manga-name").text().trim();
      const altTitle = $("div.manga-name-or").text().trim();
      const thumbnailUrl = $("div.manga-poster img.manga-poster-img").attr("src");
      const description = $("div.description").text().trim();
      const status = $("div.anisc-info div.item").find("span.name").first().text().trim();

      const mangaGenres: Array<string> = [];
      // Manga genres
      $("div.genres").find("a").each((_, element) => {
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
      $("div.chapters-list-ul ul.ulclear li.chapter-item").each((_, element) => {
        let mangaChapter = new MangaChapter();

        let mangaTitle = $(element).find("a.item-link span.name").text().trim();
        let mangaChapterNumber = mangaTitle.split(" ").at(1).replace(":", "");

        mangaChapter.title = mangaTitle;
        mangaChapter.id = mangaId.toString();
        mangaChapter.url = `/manga/mangareader/chapter/${mangaChapterNumber}`;

        manga.chapters.push(mangaChapter);
      });

      // Get manga volumes
      manga.volumes = [];
      $("div.volume-list-ul div.manga_list div.manga_list-wrap").last().find("div.item").each((_, element) => {
        let mangaVolume = new MangaVolume();

        let mangaVolumeTitle = $(element).find("div.manga-poster span.tick-item").text().trim();
        let mangaVolumeNumber = mangaVolumeTitle.split(" ").at(-1);
        let mangaVolumeThumbnail = $(element).find("div.manga-poster img.manga-poster-img").attr("src");

        mangaVolume.id = mangaId.toString();
        mangaVolume.volume = mangaVolumeTitle;
        mangaVolume.volumeNumber = Number(mangaVolumeNumber);
        mangaVolume.thumbnail = new Image(mangaVolumeThumbnail);
        mangaVolume.url = `/manga/mangareader/volume/${mangaVolumeNumber}`;

        manga.volumes.push(mangaVolume);
      });

      if (mangaGenres.some(genre => genre === "Hentai" || genre === "Ecchi") === true) manga.isNSFW = true;
      else manga.isNSFW = false;

      return manga;
    } catch (error) {
      console.log(error);
      throw new Error("I've found an error while trying to get the manga info.");
    }
  }

  async Filter(
    type?: MangaReaderFilterType,
    status?: MangaReaderFilterStatus,
    ratingType?: MangaReaderFilterRatingType,
    score?: MangaReaderFilterScore,
    language?: MangaReaderFilterLanguage,
    startYear?: number,
    startMonth?: number,
    startDay?: number,
    endYear?: number,
    endMonth?: number,
    endDay?: number,
    sort?: MangaReaderFilterSort
  ): Promise<Array<MangaSearch>> {
    const { data } = await axios.get(`${this.url}/filter`, {
      params: {
        type: type || "",
        status: status || "",
        rating_type: ratingType || "",
        score: score || "",
        language: language || "",
        sy: startYear || "",
        sm: startMonth || "",
        sd: startDay || "",
        ey: endYear || "",
        em: endMonth || "",
        ed: endDay || "",
        sort: sort || ""
      }
    });

    const $ = load(data);
    const mangaFilterResults: Array<MangaSearch> = [];

    $("div.mls-wrap div.item").each((_, element) => {
      let mangaSearchResults = new MangaSearch();

      const mangaResultsID = $(element)
      .find("div.manga-detail h3.manga-name a")
      .attr("href")
      .split("-")
      .at(-1);

      const mangaResultsTitle = $(element)
      .find("div.manga-detail h3.manga-name a").text().trim();

      const mangaResultsThumbnail = $(element)
      .find("a.manga-poster img.manga-poster-img").attr("src");

      const mangaResultsTitleUrl = $(element)
      .find("a.manga-poster").attr("href").split("-");

      // removes the last element in the array (manga id)
      mangaResultsTitleUrl.pop();

      mangaSearchResults.id = mangaResultsID;
      mangaSearchResults.title = mangaResultsTitle;
      mangaSearchResults.thumbnail = new Image(mangaResultsThumbnail);
      mangaSearchResults.url = `/manga/mangareader/title/${mangaResultsTitleUrl.join("-").replace("/", "")}`;

      mangaFilterResults.push(mangaSearchResults);
    });

    return mangaFilterResults;
  }

  async GetMangaChapters(mangaName: string, mangaId: number, type: MangaReaderChapterType) {
    try {
      const { data } = await axios.get(`${this.url}/${mangaName}-${mangaId}`);
      const $ = load(data);

      if (type === "chapter") {
        const mangaChaptersSection = $("div.chapters-list-ul");

        // check if chapters list exists
        if (mangaChaptersSection.length === 0) throw new Error("Chapters for this manga was not found.");
        else {
          const mangaChaptersArray: Array<MangaChapter> = [];

          // Search the chapters list
          $("div.chapters-list-ul ul").last().find("li.chapter-item").each((_, element) => {
            let mangaChapter = new MangaChapter();

            let mangaChapterTitle = $(element).find("a.item-link span.name").text().trim();
            let mangaChapterNumber = mangaChapterTitle.split(" ").at(1).replace(":", "");

            mangaChapter.id = mangaId.toString();
            mangaChapter.title = mangaChapterTitle;
            mangaChapter.chapterNumber = Number(mangaChapterNumber);
            mangaChapter.url = `/manga/mangareader/chapter/${mangaChapterNumber}`;

            mangaChaptersArray.push(mangaChapter);
          });

          return mangaChaptersArray;
        }

      } else if (type === "volume") {
        const mangaVolumeSection = $("div.volume-list-ul");

        // checks if volumes list exists
        if (mangaVolumeSection.length === 0) throw new Error("Volumes for this manga was not found.");
        else {
          const mangaVolumesArray: Array<MangaVolume> = [];

          $("div.volume-list-ul div.manga_list div.manga_list-wrap").last().find("div.item").each((_, element) => {
            let mangaVolume = new MangaVolume();

            let mangaVolumeTitle = $(element).find("div.manga-poster span.tick-item").text().trim();
            let mangaVolumeNumber = mangaVolumeTitle.split(" ").at(-1);
            let mangaVolumeThumbnail = $(element).find("div.manga-poster img.manga-poster-img").attr("src");

            mangaVolume.id = mangaId.toString();
            mangaVolume.volume = mangaVolumeTitle;
            mangaVolume.volumeNumber = Number(mangaVolumeNumber);
            mangaVolume.thumbnail = new Image(mangaVolumeThumbnail);
            mangaVolume.url = `/manga/mangareader/volume/${mangaVolumeNumber}`;

            mangaVolumesArray.push(mangaVolume);
          });

          return mangaVolumesArray;
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("I've found an error while trying to get the manga chapters.");
    }
  }
}
