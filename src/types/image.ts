
//Spanish Providers - TypeScript version



/*
 *In most animes include a image and banner that these anime 
 *banner probably it isn't common into pages, so banner property 
 *is opcional, the anime's image or cover always display in the pages.
 *
 * @author Mawfyy
*/

export interface IImage {
  url: string;
  banner?: string;
}

export class Image implements IImage {
  url: string;
  banner?: string;
}
