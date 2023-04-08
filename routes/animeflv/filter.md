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

```json
{
  "data": [
    {
      "animeInfo": {
        "results": [
          {
            "name": "string"
            "image": "string"
            "url": "/anime/flv/name/{name}",
            "type": "string"
          },
          {
            "name": "string"
            "image": "string"
            "url": "/anime/flv/name/{name}",
            "type": "string"
          },
          {
            "name": "string"
            "image": "string"
            "url": "/anime/flv/name/{name}",
            "type": "string"
          },
          {
            "name": "string"
            "image": "string"
            "url": "/anime/flv/name/{name}",
            "type": "string"
          }
        ]
      }
    }
  ]
}
```
