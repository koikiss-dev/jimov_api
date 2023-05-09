---
description: Retrieves information about an episode.
---

# Episode info

### Request

```url
https://jimov.herokuapp.com/anime/gogoanime/episode/:name/:episode
```

* `:name`⁣ – The episode name of the anime to retrieve servers for.
* `:episode`⁣ – The episode number of the anime to retrieve servers for.

### Example

```http
https://jimov.herokuapp.com/anime/gogoanime/episode/wonder-egg-priority/12
```

```json
{
    "servers": [
        {
            "name": "VidstreamingChoose",
            "url": "http://playtaku.net/streaming.php?id=MTU2NTc0&title=Wonder+Egg+Priority+Episode+12"
        },
        {
            "name": "Gogo serverChoose",
            "url": "http://playtaku.net/embedplus?id=MTU2NTc0&token=_Oq85NxDD0bIQ4Nn6-9ZRA&expires=1682743316"
        },
        {
            "name": "XstreamcdnChoose",
            "url": "https://fembed9hd.com/v/zdp-5sj6zkydld3"
        },
        {
            "name": "Mp4UploadChoose",
            "url": "https://www.mp4upload.com/embed-iaw20zycnjnl.html"
        },
        {
            "name": "DoodstreamChoose",
            "url": "https://dood.wf/e/x1cay66smwv8"
        }
    ],
    "name": "This isn't name"
}
```
