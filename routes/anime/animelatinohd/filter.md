---
description: Filters anime by various criteria.
---

# Filter

### Request

```url
https://jimov.herokuapp.com/anime/flv/filter
```

* `genre`⁣ – The genre of the anime.
* `page`⁣ – The page number of the results.
* `year` – The year of the anime.
* `type` – The type of the anime.
* `search` – The name of the anime.

### Example

```http
https://jimov.herokuapp.com/anime/animelatinohd/filter?genre=accion
```

```json
{
  "nav": {
    "count": 28,
    "current": 1,
    "next": 2,
    "hasNext": true
  },
  "results": [
    {
      "name": "The Marginal Service",
      "image": "https://www.themoviedb.org/t/p/original/yOvIcB0RKEt603FfFSMxEUja8AZ.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/the-marginal-service",
      "type": ""
    },
    {
      "name": "Majutsushi Orphen Hagure Tabi: Seiiki-hen",
      "image": "https://www.themoviedb.org/t/p/original/dbnBX3d0CNyXBXh8EEfrGS4Ag8k.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/majutsushi-orphen-hagure-tabi-seiiki-hen",
      "type": ""
    },
    {
      "name": "Dead Mount Death Play",
      "image": "https://www.themoviedb.org/t/p/original/A0LU3VAfThzd3CYWvZpOUcXzaPx.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/dead-mount-death-play",
      "type": ""
    },
    {
      "name": "Kimetsu no Yaiba: Katanakaji no Sato-hen",
      "image": "https://www.themoviedb.org/t/p/original/n82HJl8UxQdN0Y6bS1FOoJrZy3k.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/kimetsu-no-yaiba-katanakaji-no-sato-hen",
      "type": ""
    },
    {
      "name": "Mashle",
      "image": "https://www.themoviedb.org/t/p/original/j4uI3VfubinCGzatlZcRcjrLyZ1.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/mashle",
      "type": ""
    },
    {
      "name": "Mahou Shoujo Magical Destroyers",
      "image": "https://www.themoviedb.org/t/p/original/4CGP0vRfH5RqWFICcF0NwvguODC.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/mahou-shoujo-magical-destroyers",
      "type": ""
    },
    {
      "name": "Isekai de Cheat Skill wo Te ni Shita Ore wa, Genjitsu Sekai wo mo Musou Suru: Level Up wa Jinsei wo Kaeta",
      "image": "https://www.themoviedb.org/t/p/original/3vlTiBRCXvT3yWTbiltNxSR1faL.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/isekai-de-cheat-skill-wo-te-ni-shita-ore-wa-genjitsu-sekai-wo-mo-musou-suru-level-up-wa-jinsei-wo-kaeta",
      "type": ""
    },
    {
      "name": "Yuusha ga Shinda!",
      "image": "https://www.themoviedb.org/t/p/original/ojDBBMcUJNtvOgVVP2NEbo1UStL.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/yuusha-ga-shinda",
      "type": ""
    },
    {
      "name": "Kaminaki Sekai no Kamisama Katsudou",
      "image": "https://www.themoviedb.org/t/p/original/d82CH1EMSoC2VvYSTxCZHPboJYq.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/kaminaki-sekai-no-kamisama-katsudou",
      "type": ""
    },
    {
      "name": "Alice Gear Aegis Expansion",
      "image": "https://www.themoviedb.org/t/p/original/dVFdIXYwn5YqQ40YPBNMCJrqASK.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/alice-gear-aegis-expansion",
      "type": ""
    },
    {
      "name": "Tensei Kizoku no Isekai Boukenroku: Jichou wo Shiranai Kamigami no Shito",
      "image": "https://www.themoviedb.org/t/p/original/lkQMVlFd9wS3l6UbgFMDTROr0VF.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/tensei-kizoku-no-isekai-boukenroku-jichou-wo-shiranai-kamigami-no-shito",
      "type": ""
    },
    {
      "name": "Edens Zero 2nd Season",
      "image": "https://www.themoviedb.org/t/p/original/zwj3sFZksoFsKqYPMmqGB95H3XJ.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/edens-zero-2nd-season",
      "type": ""
    },
    {
      "name": "Jigokuraku",
      "image": "https://www.themoviedb.org/t/p/original/xAVSOUKAHOoytcwSPyc3SrcK8Sb.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/jigokuraku",
      "type": ""
    },
    {
      "name": "Shingeki no Kyojin: The Final Season - Kanketsu-hen",
      "image": "https://www.themoviedb.org/t/p/original/3LD30OXyxCaszIEYcsJ6ze7FkEu.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/shingeki-no-kyojin-the-final-season-kanketsu-hen",
      "type": ""
    },
    {
      "name": "Shuumatsu no Walküre II",
      "image": "https://www.themoviedb.org/t/p/original/sPdfpb7THdn4awbOV88nlArCUDN.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/shuumatsu-no-walkuere-ii",
      "type": ""
    },
    {
      "name": "Majutsushi Orphen Hagure Tabi: Urbanrama-hen",
      "image": "https://www.themoviedb.org/t/p/original/trcJYzhh2AKKdZKu5aZFoPtRjUp.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/majutsushi-orphen-hagure-tabi-urbanrama-hen",
      "type": ""
    },
    {
      "name": "Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu. 2",
      "image": "https://www.themoviedb.org/t/p/original/6NEBLJXyO9maJF62Rds9IVbMUDM.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2",
      "type": ""
    },
    {
      "name": "Ningen Fushin no Boukensha-tachi ga Sekai wo Sukuu you desu",
      "image": "https://www.themoviedb.org/t/p/original/wf5mPAy6LeDqBxuNMYISswXvkyQ.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/ningen-fushin-no-boukensha-tachi-ga-sekai-wo-sukuu-you-desu",
      "type": ""
    },
    {
      "name": "Vinland Saga Season 2",
      "image": "https://www.themoviedb.org/t/p/original/3QDEGJyeRKuWO9I8zKgJF5XumsP.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/vinland-saga-season-2",
      "type": ""
    },
    {
      "name": "Mononogatari",
      "image": "https://www.themoviedb.org/t/p/original/2i9wiEuw0xNiMahwJJYPTZc3QNC.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/mononogatari",
      "type": ""
    },
    {
      "name": "Ayakashi Triangle",
      "image": "https://www.themoviedb.org/t/p/original/ymkeHHPco8parWjTecM01U6Obp3.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/ayakashi-triangle",
      "type": ""
    },
    {
      "name": "Eiyuu-ou, Bu wo Kiwameru Tame Tenseisu: Soshite, Sekai Saikyou no Minarai Kishi♀",
      "image": "https://www.themoviedb.org/t/p/original/4g5qdzlq0NCi1USbEI6Cq5S73V6.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/eiyuuou-bu-wo-kiwameru-tame-tenseisu-soshite-sekai-saikyou-no-minarai-kishi",
      "type": ""
    },
    {
      "name": "High Card",
      "image": "https://www.themoviedb.org/t/p/original/2cv7XOpBZR4J887ejieouLvAsfH.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/high-card",
      "type": ""
    },
    {
      "name": "The Legend of Heroes: Sen no Kiseki - Northern War",
      "image": "https://www.themoviedb.org/t/p/original/9QRDYxdqvnrekjZL7o0G0cmtf4c.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/the-legend-of-heroes-sen-no-kiseki-northern-war",
      "type": ""
    },
    {
      "name": "NieR:Automata Ver1.1a",
      "image": "https://www.themoviedb.org/t/p/original/qHSCYOXHV3EKXKkMxUvC9rGx4Av.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/nier-automata-ver1-1a",
      "type": ""
    },
    {
      "name": "Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou II",
      "image": "https://www.themoviedb.org/t/p/original/lldncM2Lj72WvJ9eZkyNjQcNZRs.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/maou-gakuin-no-futekigousha-2nd-season",
      "type": ""
    },
    {
      "name": "Tokyo Revengers: Seiya Kessen-hen",
      "image": "https://www.themoviedb.org/t/p/original/67gDQ0W0ksnhsaKF7TRKn9hPMgN.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/tokyo-revengers-seiya-kessen-hen",
      "type": ""
    },
    {
      "name": "Nokemono-tachi no Yoru",
      "image": "https://www.themoviedb.org/t/p/original/4EzlJHCuNfUUGQsuMsxg2bdWeRY.jpg?&w=53&q=95",
      "url": "/anime/animelatinohd/name/nokemono-tachi-no-yoru",
      "type": ""
    }
  ]
}
```
