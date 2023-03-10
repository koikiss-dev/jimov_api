# getAnimeInfo

```url
https://jimov.herokuapp.com/anime/flv/:name
```

The first endpoint, `/anime/flv/:name`, uses the GET method to retrieve information about a specific anime using its name. The `:name` variable is a route parameter expected to contain the name of the anime. The controller uses the `animeInfo()` method of an object `a` to retrieve the information, and when the promise resolves, sends the response with the found information.

### Schema&#x20;

```json
  "name": "Chainsaw Man",
  "alt_name": "チェンソーマン",
  "url": "/anime/flv/chainsaw-man",
  "synopsis": "Denji es un adolescente que vive con un demonio motosierra llamado Pochita. Debido a la deuda que dejó su padre, ha estado viviendo una vida por los suelos mientras paga su deuda recolectando cadáveres de demonios con Pochita. Un día, Denji es traicionado y asesinado. A medida que su conciencia se desvanece, hace un contrato con Pochita y revive como \"Chainsaw Man\", un hombre con un corazón de diablo.",
  "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg",
  "year": 0,
  "genres": [
    "Acción",
    "Sobrenatural"
  ],
  "station": null,
  "chronology": [
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/chainsaw-man",
      "image": null
    }
  ],
  "episodes": [
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-11",
      "number": "Episodio 11",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-9",
      "number": "Episodio 9",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-8",
      "number": "Episodio 8",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-6",
      "number": "Episodio 6",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-5",
      "number": "Episodio 5",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-4",
      "number": "Episodio 4",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-2",
      "number": "Episodio 2",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    },
    {
      "name": "Chainsaw Man",
      "url": "/anime/flv/episode/chainsaw-man-1",
      "number": "Episodio 1",
      "servers": [
        
      ],
      "image": "https://img.animeflv.bz/cover/chainsaw-man.jpg"
    }
  ],
  "active": "En emision"
}
```
