//Spanish Providers - TypeScript version

/**
 * This interface only puts the server name where host episode, 
 * and url to that episode
 * 
 * @author Mawfyy
 * @author Zukaritasu 
 */
export interface IEpisodeServer {
  /** Name of the server where the episode is hosted */
  name: string;
  /** 
   * The URL of the chapter. This URL leads to the video player of the
   * server where the episode is hosted.  */
  url: string;
  /** Direct video file url for download */
  file_url?: string;
}

/**
 * This interface of the episode contains the basic properties necessary
 * for the scraper. The *servers* property contains a list of servers
 * although this is optional for performance reasons when using the API.
 * 
 * @author Zukaritasu
 */
export interface IEpisode {
  /** 
   * Name of anime episode. May contain the chapter number concatenated
   * with the anime name. */
  name: string;
  /** The episode URL in the API query */
  url: `/anime/${string}/episode/${string | number}` | string;
  /** The episode number. By default the value can be 0 in string or integer. */
  number: number | string;
  /** 
   * List of available servers where the episode is located. Remember that
   * this is not the download link of the episode but of the video player. */
  servers?: IEpisodeServer[];
  /** The image of the episode shown as thumbnail */
  image: string;
}

/**
 * This interface only puts the server name where host episode, 
 * and url to that episode
 * 
 * @author Mawfyy
 * @author Zukaritasu 
 */
export class EpisodeServer implements IEpisodeServer {
  /** @inheritdoc */
  name: string;
  /** @inheritdoc */
  url: string;
  /** @inheritdoc */
  file_url?: string;

  constructor(name?: string, url?: string) {
    this.name = name;
    this.url = url;
  }
}

/**
 * This interface of the episode contains the basic properties necessary
 * for the scraper. The *servers* property contains a list of servers
 * although this is optional for performance reasons when using the API.
 * 
 * @author Zukaritasu
 */
export class Episode implements IEpisode {
  /** @inheritdoc */
  name: string;
  /** @inheritdoc */
  url: `/anime/${string}/episode/${string | number}` | string;
  /** @inheritdoc */
  number: number | string;
  /** @inheritdoc */
  servers?: IEpisodeServer[] = [];
  /** @inheritdoc */
  image: string;
}
