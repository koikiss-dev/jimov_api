---
description: Retrieves information about an episode.
---

# Episode info

### Request

```url
https://jimov.herokuapp.com/anime/tioanime/episode/{episode}
```

`:episode`⁣ – The episode of the anime to retrieve servers for.

### Example

```http
https://jimov.herokuapp.com/anime/tioanime/episode/wonder-egg-priority-13
```

```json
[
  {
    "name": "Fembed",
    "url": "https://www.fembed.com/v/kg3l4h3235-jkl5"
  },
  {
    "name": "Mega",
    "url": "https://mega.nz/embed#!uLgFEK6a!p222oX3CZ7mbiTNk4zH8C7y_490YmaBjZ7tbRxAF5ns"
  },
  {
    "name": "Okru",
    "url": "https://ok.ru/videoembed/3656206256719"
  },
  {
    "name": "YourUpload",
    "url": "https://www.yourupload.com/embed/Fe36K2fWsPx3"
  },
  {
    "name": "Maru",
    "url": "https://my.mail.ru/video/embed/9149163570439658952#tioanime#7624"
  },
  {
    "name": "Netu",
    "url": "https://hqq.tv/player/embed_player.php?vid=RGVaaDdUVDhZendvWGhsWE9pTUNIQT09"
  }
]
```
