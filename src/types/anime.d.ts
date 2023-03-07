export interface Base {
  name: string;
} //base of interface

/*--------anime interface--------*/
export interface Anime<S, E> extends Base {
  alternative_name?: string[];
  synopsis: S[]; //use Synopsis interface
  link: `/anime/${string}/name/${string}`;//paramas -> provider's name & name of the anime -> /anime/flv/name/one-piece-tv
  image: string;
  banner?: string;
  views?: number;
  type?: "Anime" | "Movie" | "OVA" | "Special" | "ONA" | "All";
  episodes: E[]; // use Episodes interface
}

export interface Synopsis<C> {
  description: string;
  keywords?: string[];
  episodes?: number;
  climatic_station?: "Summer" | "Autumn" | "Winter" | "Spring";
  premiere?: string; //anime premiere example -> January 9th, 2023 || 9 DE ENERO DE 2023
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
  number: `Episode ${number}`;
  image?: string;
}
