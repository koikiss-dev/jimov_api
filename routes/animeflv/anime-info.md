---
description: Retrieves information about an anime series by its name.
---

# Anime Info

### Request

```http
https://jimov.herokuapp.com/anime/flv/name/{name}
```

* `:name`⁣ – The name of the anime to retrieve information about.

### Response

```json
 {
  "data": [
    {
      "animeInfo": {
        "genres": [
          "string"
        ],
        "episodes": [
          {
            "name": "string",
            "url": "/anime/flv/episode/{episode_id}",
            "number": "string",
            "image": "string"
          },
          {
            "name": "string",
            "url": "/anime/flv/episode/{episode_id}",
            "number": "string",
            "image": "string"
          }
        ],
        "name": "string",
        "alt_name": [
          "name_1", "name_2" 
        ],
        "image": {
          "url": "string"
        },
        "status": "string",
        "synopsis": "string",
        "chronology": [
          {
            "name": "string",
            "url": "/anime/flv/name/{name}"
          }
        ]
      }
    }
  ]
}

```
