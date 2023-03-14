//anime data return standard

//spanish providers - TypeScript version


type AnimeType = "Anime" | "Movie" | "OVA" | "ONA";
type ClimaticStation = "Summer" | "Autumn" | "Winter" | "Spring";

//genres animeflf
export enum Genres {
    Action = "Acción",
    MartialArts = "Artes Marciales",
    Adventure = "Aventuras",
    Racing = "Carreras",
    ScienceFiction = "Ciencia Ficción",
    Comedy = "Comedia",
    Dementia = "Demencia",
    Demons = "Demonios",
    Sports = "Deportes",
    Drama = "Drama",
    Ecchi = "Ecchi",
    School = "Escolares",
    Space = "Espacial",
    Fantasy = "Fantasía",
    Harem = "Harem",
    Historical = "Histórico",
    Kids = "Infantil",
    Josei = "Josei",
    Games = "Juegos",
    Magic = "Magia",
    Mecha = "Mecha",
    Military = "Militar",
    Mystery = "Misterio",
    Music = "Música",
    Parody = "Parodia",
    Police = "Policía",
    Psychological = "Psicológico",
    SliceOfLife = "Recuentos de la vida",
    Romance = "Romance",
    Samurai = "Samurai",
    Seinen = "Seinen",
    Shoujo = "Shoujo",
    Shounen = "Shounen",
    Supernatural = "Sobrenatural",
    Superpowers = "Superpoderes",
    Suspense = "Suspenso",
    Horror = "Terror",
    Vampires = "Vampiros",
    Yaoi = "Yaoi",
    Yuri = "Yuri",
  }
  
  export enum StatusAnimeflv {
    OnGoing = "En emisión",
    Finished = "Finalizado",
    Upcoming = "Próximamente",
  }
  
export type TypeAnimeflv = "all" | 1 | 2 | 3 | 4;
export type OrderAnimeflv = "all" | 1 | 2 | 3 | 4 | 5;
export interface IImage {
    url: string;
    banner?: string;
}

/**************************************************************
 *                     EPISODE AND SERVERS                    *
 **************************************************************/

export interface IEpisodeServer {
    name: string;
    url: string;
}

export interface IEpisode {
    name: string;
    url: `/anime/${string}/episode/${string | number}`;
    number: number | string;
    servers?: IEpisodeServer[];
    image?: string;
}

/**************************************************************
 *                     ANIME INFO                             *
 **************************************************************/

///
export interface ICalendar {
    year: number;
    month?: number;
    day?: number;
}

export interface IDatePeriod {
    begin: ICalendar;
    end?: ICalendar;
}

export interface IAnimeStats {
	score?: string | number;
	views?: string | number;
	rating?: string | number; // stars
}

///

export interface IChronology {
    name: string;
    url: `/anime/${string}/name/${string}`;
    image?: string;
}

export interface IAnime {
    name: string;
    alt_name?: string | string[];
	id?: number;
    url: `/anime/${string}/name/${string}`;
    synopsis: string;
    image: IImage;
    date?: IDatePeriod;
    type?: AnimeType;
    genres: string[];
    station?: ClimaticStation;
	stats?: IAnimeStats;
    chronology?: IChronology[];
    episodes: IEpisode[];
    status?: string | boolean;
	nsfw?: boolean;
}

/* Search */

export interface IAnimeSearch {
    name: string;
    image: string;
    url: `/anime/${string}/name/${string}`; // API url
    type?: string;
}

export interface ISearchArray {
    data: IAnimeSearch[];
    page: string | number;
}

////
export interface IPageNavigation {
    count?: number;
	current?: number;
	next?: number;
	hasNext?: boolean
}

export interface IResultSearch {
	nav?: IPageNavigation;
	results: IAnimeSearch[];
}
///


/**************************************************************
 *                  IMPLEMENTATION OF INTERFACES              *
 **************************************************************/

///
export class Calendar implements ICalendar {
    year: number;
    month?: number;
    day?: number;
}

export class DatePeriod implements IDatePeriod {
    begin: ICalendar;
    end?: ICalendar;
}

export class AnimeStats implements IAnimeStats {
	score?: string | number;
	views?: string | number;
	rating?: string | number; // stars
}

///

export class Image implements IImage {
    url: string;
    banner?: string;
}

export class EpisodeServer implements IEpisodeServer {
    name: string;
    url: string;
}

export class Episode implements IEpisode {
    name: string;
    url: `/anime/${string}/episode/${string}`;
    number: number | string;
    servers?: IEpisodeServer[] = [];
    image: string;
}

export class Chronology implements IChronology {
    name: string;
    url: `/anime/${string}/name/${string}`;
    image?: string;
}

export class Anime implements IAnime {
    name: string;
    alt_name?: string;
	id?: number;
    url: `/anime/${string}/name/${string}`;
    synopsis: string;
    image: IImage;
    date?: IDatePeriod;
    type?: AnimeType;
    genres: string[] = [];
	stats?: IAnimeStats;
    station?: ClimaticStation;
    chronology?: IChronology[];
    episodes: IEpisode[] = [];
    status?: string | boolean;
	nsfw?: boolean;
}

export class AnimeSearch implements IAnimeSearch {
    name: string;
    image: string;
    url: `/anime/${string}/name/${string}`; // API url
    type?: string;
}

export class SearchArray implements ISearchArray {
    data: IAnimeSearch[] = [];
    page: string | number;
}

export class ResultSearch implements IResultSearch {
	nav?: IPageNavigation;
	results: IAnimeSearch[] = [];
}