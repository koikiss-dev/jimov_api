/***********************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 */


//Spanish Providers - TypeScript version

/**
 * This interface only puts the server name where host episode, 
* and url to that episode
*
 * @author Mawfyy 
 */
export interface IEpisodeServer {
  name: string;
  url: string;
}

/**
 * Specify the structure episode, in the first url field is anime's name
 * and the second is the episode number
 * 
 * @author Mawfyy 
 */
export interface IEpisode {
  name: string;
  url: `/anime/${string}/episode/${string | number}`;
  number: number | string;
  servers?: IEpisodeServer[];
  image: string;
}



export class EpisodeServer implements IEpisodeServer {
  name: string;
  url: string;
}

export class Episode implements IEpisode {
  name: string;
  url: `/anime/${string}/episode/${string | number}`;
  number: number | string;
  servers?: IEpisodeServer[] = [];
  image: string;
}