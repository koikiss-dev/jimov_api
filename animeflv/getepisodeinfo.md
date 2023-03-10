# getEpisodeInfo

```url
https://jimov.herokuapp.com/anime/flv/episode/:episode
```

The endpoint `/anime/flv/episode/:episode`, uses the GET method to retrieve information about a specific episode using the episode number. The `:episode` variable is a route parameter expected to contain the episode number. The controller uses the `getEpisodeInfo()` method of an object `e` to retrieve the information, and when the promise resolves, sends the response with the found information.

```json
{
  "name": "Chainsaw Man Episodio 1",
  "url": "/anime/flv/episode/chainsaw-man-1",
  "number": "1",
  "servers": [
    {
      "name": "Our Server",
      "url": "//animeid.to/streaming.php?id=NjIxNjM=&title=Chainsaw+Man+Episodio+1"
    },
    {
      "name": "Streamsb",
      "url": "https://ssbstream.net/e/lg3rnrtxcj06"
    },
    {
      "name": "Xstreamcdn",
      "url": "https://embedsito.com/v/z7dzgcjzqzx6qqy"
    },
    {
      "name": "Streamtape",
      "url": "https://streamtape.com/e/xX6BkGd6QJCkk3W/"
    },
    {
      "name": "YourUpload",
      "url": "https://www.yourupload.com/embed/Gq81I0XQ0Cjf"
    },
    {
      "name": "Doodstream",
      "url": "https://dood.ws/e/7botwvcy5vl0"
    },
    {
      "name": "Mega",
      "url": "https://mega.nz/embed#!1xkGlT5K!qYpPOBNcbPSR67OfxUfSWBerFfadWmOiyzrGSZYIhX0"
    },
    {
      "name": "Okru",
      "url": "https://ok.ru/videoembed/4239853488752"
    },
    {
      "name": "Netu",
      "url": "https://hqq.tv/player/embed_player.php?vid=Qy91cHIvWm1malZjenJtYmR1THBKUT09"
    }
  ],
  "image": null
}
```
