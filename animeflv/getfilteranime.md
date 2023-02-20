# getFilterAnime

```url
https://jimov.herokuapp.com/anime/flv/browse/filter
```

The third endpoint, `/anime/flv/browse/filter`, uses the GET method to filter anime based on various criteria, including genre, year, type, status, order, and page. The controller uses query parameters `gen`, `year`, `type`, `status`, `ord`, and `page` to call the `Filter()` method of an object `f` and retrieve the filtered information. When the promise resolves, sends the response with the found information.

```json
{
  "data": [
    {
      "name": "Majutsushi Orphen Hagure Tabi: Urbanrama-hen",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/majutsushi-orphen-hagure-tabi-urbanramahen",
      "type": "Anime"
    },
    {
      "name": "Hikari no Ou",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/hikari-no-ou",
      "type": "Anime"
    },
    {
      "name": "Shin Shinka no Mi: Shiranai Uchi ni Kachigumi Jinsei",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/shin-shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei",
      "type": "Anime"
    },
    {
      "name": "Ooyukiumi no Kaina",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/ooyukiumi-no-kaina",
      "type": "Anime"
    },
    {
      "name": "",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2",
      "type": "Anime"
    },
    {
      "name": "Kubo-san wa Mob wo Yurusanai",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/kubosan-wa-mob-wo-yurusanai",
      "type": "Anime"
    },
    {
      "name": "Tondemo Skill de Isekai Hourou Meshi",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/tondemo-skill-de-isekai-hourou-meshi",
      "type": "Anime"
    },
    {
      "name": "Eiyuuou, Bu wo Kiwameru Tame Tenseisu: Soshite, Sekai Saikyou no Minarai Kishi♀",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/eiyuuou-bu-wo-kiwameru-tame-tenseisu-soshite-sekai-saikyou-no-minarai-kishi",
      "type": "Anime"
    },
    {
      "name": "Ayakashi Triangle",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/ayakashi-triangle",
      "type": "Anime"
    },
    {
      "name": "Mononogatari",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/mononogatari",
      "type": "Anime"
    },
    {
      "name": "Vinland Saga Season 2",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/vinland-saga-season-2",
      "type": "Anime"
    },
    {
      "name": "Kyuuketsuki Sugu Shinu 2",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/kyuuketsuki-sugu-shinu-2",
      "type": "Anime"
    },
    {
      "name": "High Card",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/high-card",
      "type": "Anime"
    },
    {
      "name": "Mou Ippon!",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/mou-ippon",
      "type": "Anime"
    },
    {
      "name": "D4DJ All Mix",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/d4dj-all-mix",
      "type": "Anime"
    },
    {
      "name": "Kyokou Suiri Season 2",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/kyokou-suiri-season-2",
      "type": "Anime"
    },
    {
      "name": "Benriya Saitou-san, Isekai ni Iku",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/benriya-saitousan-isekai-ni-iku",
      "type": "Anime"
    },
    {
      "name": "Kami-tachi ni Hirowareta Otoko 2nd Season",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/kamitachi-ni-hirowareta-otoko-2nd-season",
      "type": "Anime"
    },
    {
      "name": "Nokemono-tachi no Yoru",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/nokemonotachi-no-yoru",
      "type": "Anime"
    },
    {
      "name": "Rougo ni Sonaete Isekai de 8-manmai no Kinka wo Tamemasu",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/rougo-ni-sonaete-isekai-de-8manmai-no-kinka-wo-tamemasu",
      "type": "Anime"
    },
    {
      "name": "Kaiko sareta Ankoku Heishi (30-dai) no Slow na Second Life",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/kaiko-sareta-ankoku-heishi-30dai-no-slow-na-second-life",
      "type": "Anime"
    },
    {
      "name": "Ijiranaide, Nagatoro-san 2nd Attack",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/ijiranaide-nagatorosan-2nd-attack",
      "type": "Anime"
    },
    {
      "name": "Saikyou Onmyouji no Isekai Tenseiki",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/saikyou-onmyouji-no-isekai-tenseiki",
      "type": "Anime"
    },
    {
      "name": "Tokyo Revengers: Seiya Kessen-hen",
      "image": "https://img.animeflv.bz/cover/majutsushi-orphen-hagure-tabi-urbanramahen.jpg",
      "url": "/anime/flv/tokyo-revengers-seiya-kessenhen",
      "type": "Anime"
    }
  ],
  "page": "1"
}
```
