---
description: Retrieves information about an episode.
---

# Episode info

### Request

```url
https://jimov.herokuapp.com/anime/flv/episode/{episode}
```

`:episode`⁣ – The episode of the anime to retrieve servers for.

```json
{
  "data": [
    {
      "animeInfo": {
        "servers": [
          {
            "name": "Our Server",
            "url": "string"
          },
          {
            "name": "Streamsb",
            "url": "string"
          },
          {
            "name": "Xstreamcdn",
            "url": "string"
          },
          {
            "name": "YourUpload",
            "url": "string"
          },
          {
            "name": "Doodstream",
            "url": "string"
          },
          {
            "name": "Mega",
            "url": "string"
          },
          {
            "name": "Okru",
            "url": "string"
          },
          {
            "name": "Netu",
            "url": "string"
          }
        ],
        "name": "string",
        "url": "/anime/flv/episode/{episode}",
        "number": [
          "string"
        ]
      }
    }
  ]
}
```
