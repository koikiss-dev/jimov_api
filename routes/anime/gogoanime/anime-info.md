---
description: Retrieves information about an anime series by its name.
---

# Anime Info

### Request

```http
https://jimov.herokuapp.com/anime/gogoanime/name/{name}
```

* `:name`⁣ – The name of the anime to retrieve information about.

### Example

```http
https://jimov.herokuapp.com/anime/gogoanime/name/wonder-egg-priority
```

### Response

```json
 {
    "genres": [
        "Slice of Life",
        "Completed"
    ],
    "episodes": [
        {
            "name": "wonder-egg-priority-cap-1",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/1",
            "number": "1",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-2",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/2",
            "number": "2",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-3",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/3",
            "number": "3",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-4",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/4",
            "number": "4",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-5",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/5",
            "number": "5",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-6",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/6",
            "number": "6",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-7",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/7",
            "number": "7",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-8",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/8",
            "number": "8",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-9",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/9",
            "number": "9",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-10",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/10",
            "number": "10",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-11",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/11",
            "number": "11",
            "image": "That isn't image"
        },
        {
            "name": "wonder-egg-priority-cap-12",
            "url": "/anime/gogoanime/episode/wonder-egg-priority/12",
            "number": "12",
            "image": "That isn't image"
        }
    ],
    "name": "Wonder Egg Priority",
    "image": {
        "url": "https://gogocdn.net/cover/wonder-egg-priority.png"
    },
    "alt_name": "ワンダーエッグ・プライオリティ",
    "synopsis": "A story of troubled girls, spun by screenwriter Shinji Nojima in the world of anime.\n\nLed by a mysterious voice while on a midnight stroll, 14-year-old girl Ai Ooto picks up an egg. The voice coaxes her: \"If you want to change the future, you only need to choose now. Now, believe in yourself and break the egg.\"\n\nWhat awaits Ai after the breaking of the egg...",
    "status": true
}

```
