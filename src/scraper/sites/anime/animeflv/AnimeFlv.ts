import axios from "axios";
import { load } from "cheerio";
import { AnimeInfo, Synopsis, Episodes, InfoCronology } from "src/types/anime";

/*
It is not finished yet but you can get an idea

Suggested structure for the providers, you must declare a class and inside write the necessary 
functions but the three that are required are: GetAnimeInfo that will return the information of 
the anime in general, EpisodeServers that will return the links and names of the servers 
where the episodes are and Search that will return an array with the search results, please check 
the file anime.d.ts. Encapsulate everything in the same file with the name 
of the provider, e.g. Animeflv.ts.

Sincerely: yako :)
*/

class AnimeFlv {
  readonly url = "https://www2.animeflv.bz";
  async GetAnimeInfo(
    anime: string
  ): Promise<AnimeInfo<Synopsis<InfoCronology>, Episodes>> {
    try {
      const { data } = await axios.get(`${this.url}/anime/${anime}`);
      const $ = load(data);
      const title = $("h2.Title").text().trim();
      const title_alt = $("span.TxtAlt").text().trim();
      const img = $("div.AnimeCover .Image figure img").attr("src");
      //const status = $("p.AnmStts span").text().trim();
      const desc = $("div.Description").text().trim();
      //const episodesNumber = $(".ListCaps li a");
      const gen = [];
      //get genres
      $("nav.Nvgnrs a").each((_i, e) => {
        const key = $(e).text().trim();
        gen.push(key);
      });

      const animeInfo: AnimeInfo<Synopsis<InfoCronology>, Episodes> = {
        name: title,
        alternative_name: [title_alt],
        image: img,
        synopsis: [
          {
            description: desc,
            keywords: gen,
          },
        ],
        episodes: [],
        link: `/anime/${"flv"}/name/${anime}`,
      };
      return animeInfo;
    } catch (error) {
      console.log(error);
    }
  }
}

const ff = new AnimeFlv();
ff.GetAnimeInfo("one-piece-tv").then((f) => {
  console.log(f);
});
