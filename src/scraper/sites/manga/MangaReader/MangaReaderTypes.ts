export enum MangaReaderFilterType {
  All = "",
  Manga = 1,
  OneShot,
  Doujinshi,
  LightNovel,
  Manhwa,
  Manhua,
  Comic = 8
}

export enum MangaReaderFilterStatus {
  All = "",
  Finished = 1,
  Publishing,
  OnHiatus,
  Discontinued,
  NotYetPublished
}

export enum MangaReaderFilterRatingType {
  All = "",
  AllAges = 1,
  Children,
  Teens,
  Mature,
  MildNudity,
  Adults
}

export enum MangaReaderFilterScore {
  All = "",
  Appalling = 1,
  Horrible,
  VeryBad,
  Bad,
  Average,
  Fine,
  Good,
  VeryGood,
  Great,
  Masterpiece
}

export enum MangaReaderFilterLanguage {
  All = "",
  English = "en",
  Japanese = "ja",
  Korean = "ko",
  Chinese = "zh",
  French = "fr"
}

export enum MangaReaderFilterSort {
  All = "",
  LatestUpdated = "latest-updated",
  Score = "score",
  NameAZ = "name-az",
  ReleaseDate = "release-date",
  MostViewed = "most-viewed"
}

export type MangaReaderChapterType = "chapter" | "volume";
