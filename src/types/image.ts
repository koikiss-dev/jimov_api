//Spanish Providers - TypeScript version

/**
 * In most animes include a image and banner that these anime 
 * banner probably it isn't common into pages, so banner property 
 * is opcional, the anime's image or cover always display in the pages.
 *
 * @author Mawfyy
 */
export interface IImage {
  /** The URL of the content image */
  url: string;
  /** 
   * The URL of the content banner. It is optional because it is not available
   * in all sites. */
  banner?: string;
}

/**
 * In most animes include a image and banner that these anime 
 * banner probably it isn't common into pages, so banner property 
 * is opcional, the anime's image or cover always display in the pages.
 *
 * @author Mawfyy
 */
export class Image implements IImage {
  /** @inheritdoc */
  url: string;
  /** @inheritdoc */
  banner?: string;

  constructor(url: string, banner?: string) {
    this.url = url;
    this.banner = banner;
  }
}
