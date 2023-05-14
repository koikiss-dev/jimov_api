---
description: Filters anime by various criteria.
---

# Filter

### Request

```url
https://jimov.herokuapp.com/anime/gogoanime/filter
```

* `gen`⁣ – The genre of the anime.
* `year` – The year of the anime.
* `season` – The season of the anime: Winter | Spring | Summer | Fall
* `page` – The page number to continue searching

### Example

```http
https://jimov.herokuapp.com/anime/gogoanime/filter?gen=action&page=1&season=winter&year=2022
```

```json
[
    {
        "name": "Bloody Escape: Jigoku no Tousou Geki",
        "image": {
            "url": "https://gogocdn.net/cover/bloody-escape-jigoku-no-tousou-geki.png"
        },
        "url": "/anime/gogoanime/name/bloody-escape-jigoku-no-tousou-geki",
        "date": {
            "begin": {
                "year": 2024
            }
        }
    },
    {
        "name": "Metallic Rouge",
        "image": {
            "url": "https://gogocdn.net/cover/metallic-rouge.png"
        },
        "url": "/anime/gogoanime/name/metallic-rouge",
        "date": {
            "begin": {
                "year": 2024
            }
        }
    },
    {
        "name": "Kekkon Yubiwa Monogatari",
        "image": {
            "url": "https://gogocdn.net/cover/kekkon-yubiwa-monogatari-1679898826.png"
        },
        "url": "/anime/gogoanime/name/kekkon-yubiwa-monogatari",
        "date": {
            "begin": {
                "year": 2024
            }
        }
    },
    {
        "name": "Highspeed Etoile",
        "image": {
            "url": "https://gogocdn.net/cover/highspeed-etoile.png"
        },
        "url": "/anime/gogoanime/name/highspeed-etoile",
        "date": {
            "begin": {
                "year": 2024
            }
        }
    },
    {
        "name": "Rabbits Kingdom the Movie",
        "image": {
            "url": "https://gogocdn.net/cover/rabbits-kingdom-the-movie.png"
        },
        "url": "/anime/gogoanime/name/rabbits-kingdom-the-movie",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Digimon Adventure 02: The Beginning",
        "image": {
            "url": "https://gogocdn.net/cover/02-1679899114.png"
        },
        "url": "/anime/gogoanime/name/02",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Kamierabi",
        "image": {
            "url": "https://gogocdn.net/cover/kamierabi.png"
        },
        "url": "/anime/gogoanime/name/kamierabi",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Spy x Family Season 2",
        "image": {
            "url": "https://gogocdn.net/cover/spy-x-family-season-2.png"
        },
        "url": "/anime/gogoanime/name/spy-x-family-season-2",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Under Ninja",
        "image": {
            "url": "https://gogocdn.net/cover/under-ninja-1677472418.png"
        },
        "url": "/anime/gogoanime/name/under-ninja",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Saihate no Paladin: Tetsusabi no Yama no Ou",
        "image": {
            "url": "https://gogocdn.net/cover/saihate-no-paladin-tetsusabi-no-yama-no-ou.png"
        },
        "url": "/anime/gogoanime/name/saihate-no-paladin-tetsusabi-no-yama-no-ou",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Megumi no Daigo: Kyuukoku no Orange",
        "image": {
            "url": "https://gogocdn.net/cover/megumi-no-daigo-kyuukoku-no-orange-1672974940.png"
        },
        "url": "/anime/gogoanime/name/megumi-no-daigo-kyuukoku-no-orange",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Nanatsu no Taizai: Mokushiroku no Yonkishi",
        "image": {
            "url": "https://gogocdn.net/cover/nanatsu-no-taizai-mokushiroku-no-yonkishi-1679886027.png"
        },
        "url": "/anime/gogoanime/name/nanatsu-no-taizai-mokushiroku-no-yonkishi",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Sand Land",
        "image": {
            "url": "https://gogocdn.net/cover/sand-land.png"
        },
        "url": "/anime/gogoanime/name/sand-land",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Jujutsu Kaisen 2nd Season",
        "image": {
            "url": "https://gogocdn.net/cover/jujutsu-kaisen-tv-2nd-season-1679892666.png"
        },
        "url": "/anime/gogoanime/name/jujutsu-kaisen-tv-2nd-season",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Fate/strange Fake: Whispers of Dawn",
        "image": {
            "url": "https://gogocdn.net/cover/fatestrange-fake-whispers-of-dawn.png"
        },
        "url": "/anime/gogoanime/name/fatestrange-fake-whispers-of-dawn",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Rurouni Kenshin: Meiji Kenkaku Romantan (2023)",
        "image": {
            "url": "https://gogocdn.net/cover/rurouni-kenshin-meiji-kenkaku-romantan-2023.png"
        },
        "url": "/anime/gogoanime/name/rurouni-kenshin-meiji-kenkaku-romantan-2023",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Zom 100: Zombie ni Naru made ni Shitai 100 no Koto",
        "image": {
            "url": "https://gogocdn.net/cover/zom-100-zombie-ni-naru-made-ni-shitai-100-no-koto.png"
        },
        "url": "/anime/gogoanime/name/zom-100-zombie-ni-naru-made-ni-shitai-100-no-koto",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Eiyuu Kyoushitsu",
        "image": {
            "url": "https://gogocdn.net/cover/eiyuu-kyoushitsu-1679556608.png"
        },
        "url": "/anime/gogoanime/name/eiyuu-kyoushitsu",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Nanatsu no Maken ga Shihai suru",
        "image": {
            "url": "https://gogocdn.net/cover/nanatsu-no-maken-ga-shihai-suru.png"
        },
        "url": "/anime/gogoanime/name/nanatsu-no-maken-ga-shihai-suru",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    },
    {
        "name": "Ayaka",
        "image": {
            "url": "https://gogocdn.net/cover/ayaka.png"
        },
        "url": "/anime/gogoanime/name/ayaka",
        "date": {
            "begin": {
                "year": 2023
            }
        }
    }
]
```
