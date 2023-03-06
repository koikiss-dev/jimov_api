interface Base{
    name: string,
}//base of interface

export interface Anime<S> extends Base{
    alternative_name?: string,
    image: string,
    banner?: string,
    type?: string,
    link: string,
    synopsis: S[],//use synopsis interface
}

export interface Synopsis<C>{
    description: string,
    keywords?: string[],
    premiere?: string,
    cronology?: C[]//use InfoCronology
}
export interface InfoCronology extends Base{
    image?: string,
    link: string,
}


