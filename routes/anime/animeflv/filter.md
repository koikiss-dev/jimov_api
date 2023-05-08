---
description: Filters anime by various criteria.
---

# Filter

### Request

```url
https://jimov.herokuapp.com/anime/flv/filter
```

* `gen`⁣ – The genre of the anime.
* `date`⁣ – The year the anime was released.
* `type`⁣ – The type of the anime.
* `status`⁣ – The status of the anime.
* `ord`⁣ – The order to sort the anime by.
* `page`⁣ – The page number of the results.
* `title`⁣ – The name of the anime (goes alone).

### Example

```http
https://jimov.herokuapp.com/anime/flv/filter?gen=accion&ord=1
```

```json
{
  "results": [
    {
      "name": "Tensei shitara Slime Datta Ken Movie: Guren no Kizuna-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen",
      "type": "Película"
    },
    {
      "name": "Majutsushi Orphen Hagure Tabi: Seiiki-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/majutsushi-orphen-hagure-tabi-seiikihen",
      "type": "Anime"
    },
    {
      "name": "The Marginal Service",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/the-marginal-service",
      "type": "Anime"
    },
    {
      "name": "Dead Mount Death Play",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/dead-mount-death-play",
      "type": "Anime"
    },
    {
      "name": "Kimetsu no Yaiba: Katanakaji no Sato-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/kimetsu-no-yaiba-katanakaji-no-satohen",
      "type": "Anime"
    },
    {
      "name": "Mahou Shoujo Magical Destroyers",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/mahou-shoujo-magical-destroyers",
      "type": "Anime"
    },
    {
      "name": "Mashle",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/mashle",
      "type": "Anime"
    },
    {
      "name": "Yuusha ga Shinda!",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/yuusha-ga-shinda",
      "type": "Anime"
    },
    {
      "name": "Kaminaki Sekai no Kamisama Katsudou",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/kaminaki-sekai-no-kamisama-katsudou",
      "type": "Anime"
    },
    {
      "name": "Iseleve",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/iseleve",
      "type": "Anime"
    },
    {
      "name": "Kuma Kuma Kuma Bear Punch!",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/kuma-kuma-kuma-bear-punch",
      "type": "Anime"
    },
    {
      "name": "Alice Gear Aegis Expansion",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/alice-gear-aegis-expansion",
      "type": "Anime"
    },
    {
      "name": "Tensei Kizoku no Isekai Boukenroku: Jichou wo Shiranai Kamigami no Shito",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/tensei-kizoku-no-isekai-boukenroku-jichou-wo-shiranai-kamigami-no-shito",
      "type": "Anime"
    },
    {
      "name": "Edens Zero 2nd Season",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/edens-zero-2nd-season",
      "type": "Anime"
    },
    {
      "name": "Jigokuraku",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/jigokuraku",
      "type": "Anime"
    },
    {
      "name": "Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu. 2",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2",
      "type": "Anime"
    },
    {
      "name": "Kimetsu no Yaiba Movie: Mugen Ressha-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/kimetsu-no-yaiba-movie-mugen-resshahen",
      "type": "Película"
    },
    {
      "name": "Kimetsu no Yaiba: Yuukaku-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/kimetsu-no-yaiba-yuukakuhen",
      "type": "Anime"
    },
    {
      "name": "Kyuuketsuki Sugu Shinu",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/kyuuketsuki-sugu-shinu",
      "type": "Anime"
    },
    {
      "name": "Shingeki no Kyojin: The Final Season - Kanketsu-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/shingeki-no-kyojin-the-final-season-kanketsuhen",
      "type": "Especial"
    },
    {
      "name": "Majutsushi Orphen Hagure Tabi: Urbanrama-hen",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/majutsushi-orphen-hagure-tabi-urbanramahen",
      "type": "Anime"
    },
    {
      "name": "Tondemo Skill de Isekai Hourou Meshi",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/tondemo-skill-de-isekai-hourou-meshi",
      "type": "Anime"
    },
    {
      "name": "Eiyuuou, Bu wo Kiwameru Tame Tenseisu: Soshite, Sekai Saikyou no Minarai Kishi♀",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/eiyuuou-bu-wo-kiwameru-tame-tenseisu-soshite-sekai-saikyou-no-minarai-kishi",
      "type": "Anime"
    },
    {
      "name": "Ayakashi Triangle",
      "image": "https://img.animeflv.bz/cover/tensei-shitara-slime-datta-ken-movie-guren-no-kizunahen.jpg",
      "url": "/anime/flv/name/ayakashi-triangle",
      "type": "Anime"
    }
  ]
}
```
