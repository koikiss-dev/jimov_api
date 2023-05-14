---
description: Retrieves information about an episode.
---

# Episode info

### Request

```url
https://jimov.herokuapp.com/anime/flv/episode/{episode}
```

`:episode`⁣ – The episode of the anime to retrieve servers for.

### Example

```http
https://jimov.herokuapp.com/anime/flv/episode/wonder-egg-priority-13
```

```json
{
  "servers": [
    {
      "name": "Our Server",
      "url": "//animeid.live/streaming.php?id=NjA1ODQ=&title=Wonder+Egg+Priority+Episodio+13"
    },
    {
      "name": "Filemoon",
      "url": "https://moonplayer.lat/e/btw76o8qbjue"
    },
    {
      "name": "Streamsb",
      "url": "https://embedsb.com/e/jxy5x6wld0d3.html"
    },
    {
      "name": "Xstreamcdn",
      "url": "https://embedsito.com/v/y26kwhexenr72rj"
    },
    {
      "name": "Streamtape",
      "url": "https://streamtape.com/e/0zDPbabpL8u6GV/"
    },
    {
      "name": "YourUpload",
      "url": "https://www.yourupload.com/embed/mjbE21c0x5Gi"
    },
    {
      "name": "Doodstream",
      "url": "https://dood.yt/e/bhkglnl6q986"
    },
    {
      "name": "Mega",
      "url": "https://mega.nz/embed#!c8cyUJrQ!Kgpz4x9k3Af4ZoOQYHX9zUo0RBD6WSbTXyuTNDwwvS4"
    },
    {
      "name": "Okru",
      "url": "https://ok.ru/videoembed/3459771468298"
    },
    {
      "name": "Netu",
      "url": "https://hqq.tv/player/embed_player.php?vid=VDU2MWErUDNocHVvUjNVV2g0cUZGUT09"
    },
    {
      "name": "Vidlox",
      "url": "https://playhide.online/e/cagi0mns1h67"
    }
  ],
  "name": "Wonder Egg Priority Episodio 13",
  "url": "/anime/flv/episode/wonder-egg-priority-13",
  "number": [
    "13"
  ]
}
```
