export class NewsShema{
    constructor(){
        this.data = new Array()
    }
}
export class NewsInfo{
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
        //this.url = url;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
        this.topics = new Array();
        this.banner = banner;
        this.preview = {
            images: new Array(),
            full: full,
        }
    }
}

export class Post{
    constructor(title, image, date, url){
        this.title = title;
        this.image = image;
        this.date = date;
        this.url = url
        this.topics = new Array();
    }
}