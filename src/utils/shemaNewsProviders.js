export class NewsInfoCard{
    /**
     * 
     * @param {*} title 
     * @param {*} url 
     * @param {*} uploadedAt 
     * @param {*} uploadedBy 
     * @param {*} banner 
     * @param {*} intro 
     * @param {*} full 
     */
    constructor(title, url, uploadedAt, uploadedBy, banner, intro, full){
        this.title = title;
        this.url = url;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
        this.topics = new Array();
        this.banner = banner;
        this.preview = {
            intro: intro,
            full: full,
        }
    }
}

export class NewsShema{
    constructor(){
        this.data = new Array()
    }
}