export interface IManganatoFilterParams {
  /** Status */
  sts: string;
  /** Order by */
  orby: string;
  genres: string;
  /** Results page */
  page: number;
};

export const genreList = {
  action: 2,
  manhua: 44
} as const;

export const orderByOptionsList = ["topview", "newest", "az"] as const;
export type orderByOptions = typeof orderByOptionsList[number];
