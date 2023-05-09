---
description: Filters anime by various criteria.
---

# Filter

### Request

```url
https://jimov.herokuapp.com/anime/tioanime/filter
```

* `gen`⁣ – The genre of the anime.
* `begin_year` – The starting year.
* `end_year` – The final year.
* `type`⁣ – The type of the anime.
* `status`⁣ – The status of the anime: 3 = coming soon, 2 = completed, 1 = on air, 1 = on air.
* `sort`⁣ – Order to show the anime: recent, -recent.

### Example

```http
https://jimov.herokuapp.com/anime/tioanime/filter?gen=accion&type=0&begin_year=1950&begin_year=2023&status=2&sort=recent
```

```json
{
    "results": [
        {
            "name": "Majutsushi Orphen Hagure Tabi: Urbanrama-hen",
            "image": "https://tioanime.com/uploads/portadas/3801.jpg",
            "url": "/anime/tioanime/name/majutsushi-orphen-hagure-tabi-urbanramahen",
            "type": "Null"
        },
        {
            "name": "Hikari no Ou",
            "image": "https://tioanime.com/uploads/portadas/3800.jpg",
            "url": "/anime/tioanime/name/hikari-no-ou",
            "type": "Null"
        },
        {
            "name": "Shin Shinka no Mi: Shiranai Uchi ni Kachigumi Jinsei",
            "image": "https://tioanime.com/uploads/portadas/3799.jpg",
            "url": "/anime/tioanime/name/shin-shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei",
            "type": "Null"
        },
        {
            "name": "Ooyukiumi no Kaina",
            "image": "https://tioanime.com/uploads/portadas/3798.jpg",
            "url": "/anime/tioanime/name/ooyukiumi-no-kaina",
            "type": "Null"
        },
        {
            "name": "Tondemo Skill de Isekai Hourou Meshi",
            "image": "https://tioanime.com/uploads/portadas/3796.jpg",
            "url": "/anime/tioanime/name/tondemo-skill-de-isekai-hourou-meshi",
            "type": "Null"
        },
        {
            "name": "High Card",
            "image": "https://tioanime.com/uploads/portadas/3789.jpg",
            "url": "/anime/tioanime/name/high-card",
            "type": "Null"
        },
        {
            "name": "Kyuuketsuki Sugu Shinu 2",
            "image": "https://tioanime.com/uploads/portadas/3792.jpg",
            "url": "/anime/tioanime/name/kyuuketsuki-sugu-shinu-2",
            "type": "Null"
        },
        {
            "name": "Eiyuuou, Bu wo Kiwameru Tame Tenseisu",
            "image": "https://tioanime.com/uploads/portadas/3793.jpg",
            "url": "/anime/tioanime/name/eiyuuou-bu-wo-kiwameru-tame-tenseisu",
            "type": "Null"
        },
        {
            "name": "Mononogatari",
            "image": "https://tioanime.com/uploads/portadas/3790.jpg",
            "url": "/anime/tioanime/name/mononogatari",
            "type": "Null"
        },
        {
            "name": "D4DJ All Mix",
            "image": "https://tioanime.com/uploads/portadas/3788.jpg",
            "url": "/anime/tioanime/name/d4dj-all-mix",
            "type": "Null"
        },
        {
            "name": "Nokemono-tachi no Yoru",
            "image": "https://tioanime.com/uploads/portadas/3784.jpg",
            "url": "/anime/tioanime/name/nokemonotachi-no-yoru",
            "type": "Null"
        },
        {
            "name": "Benriya Saitou-san, Isekai ni Iku",
            "image": "https://tioanime.com/uploads/portadas/3785.jpg",
            "url": "/anime/tioanime/name/benriya-saitousan-isekai-ni-iku",
            "type": "Null"
        },
        {
            "name": "Kami-tachi ni Hirowareta Otoko 2nd Season",
            "image": "https://tioanime.com/uploads/portadas/3783.jpg",
            "url": "/anime/tioanime/name/kamitachi-ni-hirowareta-otoko-2nd-season",
            "type": "Null"
        },
        {
            "name": "Kyokou Suiri Season 2",
            "image": "https://tioanime.com/uploads/portadas/3786.jpg",
            "url": "/anime/tioanime/name/kyokou-suiri-season-2",
            "type": "Null"
        },
        {
            "name": "Mou Ippon!",
            "image": "https://tioanime.com/uploads/portadas/3787.jpg",
            "url": "/anime/tioanime/name/mou-ippon",
            "type": "Null"
        },
        {
            "name": "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken",
            "image": "https://tioanime.com/uploads/portadas/3774.jpg",
            "url": "/anime/tioanime/name/otonari-no-tenshisama-ni-itsunomanika-dame-ningen-ni-sareteita-ken",
            "type": "Null"
        },
        {
            "name": "Kaiko sareta Ankoku Heishi (30-dai) no Slow na Second Life",
            "image": "https://tioanime.com/uploads/portadas/3773.jpg",
            "url": "/anime/tioanime/name/kaiko-sareta-ankoku-heishi-30dai-no-slow-na-second-life",
            "type": "Null"
        },
        {
            "name": "Rougo ni Sonaete Isekai de 8-manmai no Kinka wo Tamemasu",
            "image": "https://tioanime.com/uploads/portadas/3781.jpg",
            "url": "/anime/tioanime/name/rougo-ni-sonaete-isekai-de-8manmai-no-kinka-wo-tamemasu",
            "type": "Null"
        },
        {
            "name": "Tokyo Revengers: Seiya Kessen-hen",
            "image": "https://tioanime.com/uploads/portadas/3782.jpg",
            "url": "/anime/tioanime/name/tokyo-revengers-seiya-kessenhen",
            "type": "Null"
        },
        {
            "name": "UniteUp!",
            "image": "https://tioanime.com/uploads/portadas/3777.jpg",
            "url": "/anime/tioanime/name/uniteup",
            "type": "Null"
        }
    ]
}
```
