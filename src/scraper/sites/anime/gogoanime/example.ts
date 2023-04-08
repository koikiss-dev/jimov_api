import { getHTML } from "./assets/getHTML";

(async () => {

const $ = await getHTML("https://www3.gogoanimes.fi/sub-category/summer-2017-anime?page=5");


let pageState = $(".anime_name h2").text(). 
replace("ADVERTISEMENTSRECENT RELEASESeason", "").
trim();


console.log(pageState);



})()

