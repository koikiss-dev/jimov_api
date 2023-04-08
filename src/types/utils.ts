/***********************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 */


//Spanish Providers - TypeScript version

interface IPageInfo {
    name: string
    url: string, // url page
    server: string,
    domain: string
}

//================== API functions ==================

export const api = {
    /**
     * Replaces the original URL with the API URL
     * 
     * @param info 
     * @param url 
     * @returns 
     */
    getEpisodeURL(info: IPageInfo, url: string): string {
        return url.replace(`https://${ info.domain }/ver/`, `/anime/${ info.name }/episode/`);
    },

    /**
     * Replaces the original URL with the API URL
     * 
     * @param info 
     * @param url 
     * @returns 
     */
    getAnimeURL(info: IPageInfo, url: string): string {
        return url.replace(`https://${ info.domain }/anime/`, `/anime/${ info.name }/name/`);
    }
}

//===================================================

export const utils = {
    /**
     * 
     * @param object 
     * @returns 
     */
    isUsableValue(object: any): boolean {
        return object == null || object == undefined;
    }
}