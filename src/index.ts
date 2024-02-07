import express from "express";
import morgan from "morgan";
import index from "./routes/app";
import providersList from "./routes/providers";
import flv from "./routes/v1/anime/animeflv/AnimeflvRoutes";
import latinhd from "./routes/v1/anime/animelatinohd/AnimeLatinoHDRoutes";
import gogoanime from "./routes/v1/anime/gogoanime/GogoAnimeRoute";
import zoro from "./routes/v1/anime/zoro/ZoroRoutes";
import monoschinos from "./routes/v1/anime/monoschinos/MonosChinosRoute";
import tioanime from './routes/v1/anime/tioanime/TioAnimeRoute'
import comick from "./routes/v1/manga/comick/ComickRoutes";

import inmanga from "./routes/v1/manga/inmanga/InmangaRoutes";
import nhentai from "./routes/v1/manga/nhentai/NhentaiRoutes"
import mangareader from "./routes/v1/manga/mangareader/MangaReaderRoutes";
import manganelo from "./routes/v1/manga/manganelo/ManganeloRoutes";
import helmet from "helmet";
import cors from 'cors'
import WcoStream from "./routes/v1/anime/wcostream/wcostreamRoutes";
const app = express();
const port = process.env.PORT || 3000;

app.use(index);
app.use(providersList);
//config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors())

//routes

/*anime*/
app.use(flv);
app.use(latinhd);
app.use(gogoanime);
app.use(monoschinos);
app.use(zoro);
app.use(tioanime)
app.use(WcoStream);
/*anime*/

/*Manga*/
app.use(comick);
app.use(inmanga);
app.use(nhentai)
app.use(mangareader);
app.use(manganelo);
/*Manga*/



/*error */

interface ErrorResponse {
  error: {
    message: string;
    status: number;
  };
}

app.use((err, res, _next) => {
  //console.log(err.statusCode);
  let response: ErrorResponse;
  switch (err.statusCode) {
    case 500:
      response = {
        error: {
          message: "An internal server error occurred",
          status: 500,
        },
      };
      break;
    case 400:
      response = {
        error: {
          message: "There was an error with the request parameters",
          status: 400,
        },
      };
      break;
    default:
      response = {
        error: {
          message: "The requested resource was not found",
          status: 404,
        },
      };
      break;
  }
  res.status(response.error.status).send(response);
});


app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});

module.exports = app;
