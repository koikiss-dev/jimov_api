//import * as puppeteer from "puppeteer";
import avd from "all-video-downloader";
class AnimeExtractor {
  async getSouruces(link:string) {
    avd(link).then((result: any) => {
      console.log(result);
      return result;
    });
  }
}

const g = new AnimeExtractor();

g.getSouruces("https://9anime.to/watch/urusei-yatsura.rllzm/ep-18").then(
  (f) => {
    console.log(f);
  }
);
