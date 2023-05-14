---
description: Retrieves information about an episode.
---

# Episode info

### Request

```url
https://jimov.herokuapp.com/anime/animelatinohd/episode/{episode}
```

`:episode`⁣ – The episode of the anime to retrieve servers for.

### Example

```http
https://jimov.herokuapp.com/anime/animelatinohd/episode/wonder-egg-priority-12
```

```json
{
  "name": "Wonder Egg Priority",
  "url": "/anime/animelatinohd/episode/wonder-egg-priority-12",
  "number": "12",
  "image": "",
  "servers": [
    {
      "name": "AlphaM",
      "url": "https://api.animelatinohd.com/stream/58252"
    },
    {
      "name": "Alpha",
      "url": "https://api.animelatinohd.com/stream/58251"
    },
    {
      "name": "Eta",
      "url": "https://api.animelatinohd.com/stream/34067"
    },
    {
      "name": "AlphaM",
      "url": "https://api.animelatinohd.com/stream/211851"
    },
    {
      "name": "Alpha",
      "url": "https://api.animelatinohd.com/stream/201851"
    }
  ]
}
```
