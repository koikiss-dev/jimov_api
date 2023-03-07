export interface Base {
  name: string;
} //base of interface

type AnimeType = "Anime" | "Movie" | "OVA" | "Special" | "ONA" | "Music" | "All";
type Status = "Ongoing" | "Completed" | "Hiatus" | "Cancelled" | "Not yet aired" | "Unknow"; 
type ClimaticStation = "Summer" | "Autumn" | "Winter" | "Spring";
type StreamingServersName = "asianload" | "gogocdn" | "streamsb" | "mixdrop" | "upcloud" | "vidcloud" | "streamtape" | "vizcloud" | "mycloud" | "filemoon" | "vidstreaming";

/*export enum StreamingServers {
  AsianLoad = 'asianload',
  GogoCDN = 'gogocdn',
  StreamSB = 'streamsb',
  MixDrop = 'mixdrop',
  UpCloud = 'upcloud',
  VidCloud = 'vidcloud',
  StreamTape = 'streamtape',
  VizCloud = 'vizcloud',
  // same as vizcloud
  MyCloud = 'mycloud',
  Filemoon = 'filemoon',
  VidStreaming = 'vidstreaming',
}*/

export interface Date {
  year?: number;
  month?: number;
  day?: number;
}
/*--------anime search interface--------*/
export interface IsSearch<R>{
  totalPages?: number;
  currentPage?: number;
  nextPage?: number;
  hasNextPage?: boolean
  totalResults?: number;
  results: R[];
}

export interface SearchAnimeResult extends Base{
  id?: number;
  image?: string;
  link: `/anime/${string}/name/${string}`;//paramas -> provider's name & name of the anime -> /anime/flv/name/one-piece-tv
  type?: AnimeType
  rating?: number;
  status?: Status;
  releaseDate?: string; //anime premiere example -> January 9th, 2023 || 9 DE ENERO DE 2023
}
/*--------anime search interface--------*/

/*--------anime info interface--------*/
export interface AnimeInfo<S, E> extends SearchAnimeResult {
  alternative_name?: string[];
  banner?: string;
  synopsis: S[]; //use Synopsis interface
  episodes: E[]; // use Episodes interface
  views?: number;
  adult?: boolean;
  studios?: string[];
  trailer?: string;//youtube source, etc.
}

export interface Synopsis<C> {
  description: string;
  keywords?: string[];
  episodes?: number | string;
  climaticStation?: ClimaticStation;
  startDate?: Date | string; //anime start date
  endDate?: Date | string; //anime end date
  score?: string;
  status?: string;
  cronology?: C[]; //use InfoCronology
}
export interface InfoCronology extends Base {
  image?: string;
  link: `/anime/${string}/name/${string}`;//paramas -> provider's name & name of the anime -> /anime/flv/episode/one-piece-tv
}

export interface Episodes extends Base {
  link: `/anime/${string}/episode/${string}`;//paramas -> provider's name & episode of the anime -> /anime/flv/episode/one-piece-tv-20;
  number?: `Episode ${number}`;
  image?: string;
  totalEpisodes?: number;
}

export interface EpisodeServer{
  name: StreamingServersName;
  link: string;
}
/*--------anime info interface--------*/
/*
export enum MediaStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  HIATUS = 'Hiatus',
  CANCELLED = 'Cancelled',
  NOT_YET_AIRED = 'Not yet aired',
  UNKNOWN = 'Unknown',
} */