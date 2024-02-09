export const manganatoOrderByOptionsList = ["topview", "newest", "az"] as const;
export type manganatoOrderByOptions = typeof manganatoOrderByOptionsList[number];

export interface IManganatoFilterParams {
  /**
   * Manga status
   *
   * Available status: "ongoing", "completed", empty string | null (for both)
   */
  sts: "ongoing" | "completed";
  /** Order by */
  orby: manganatoOrderByOptions;
  genres: string;
  /** Results page */
  page: number;
};

export const manganatoGenreList = {
  action: 2,
  adult: 3,
  adventure: 4,
  comedy: 6,
  cooking: 7,
  doujinshi: 9,
  drama: 10,
  ecchi: 11,
  fantasy: 12,
  genderbender: 13,
  harem: 14,
  historical: 15,
  horror: 16,
  josei: 17,
  martialarts: 19,
  mature: 20,
  mecha: 21,
  medical: 22,
  mystery: 24,
  oneshot: 25,
  psychological: 26,
  romance: 27,
  schoollife: 28,
  scifi: 29,
  seinen: 30,
  shoujo: 31,
  shoujoai: 32,
  shounen: 33,
  shounenai: 34,
  sliceoflife: 35,
  smut: 36,
  sports: 37,
  supernatural: 38,
  tragedy: 39,
  webtoons: 40,
  yaoi: 41,
  yuri: 42,
  manhwa: 43,
  manhua: 44,
  isekai: 45,
  pornographic: 47,
  erotica: 48
} as const;
