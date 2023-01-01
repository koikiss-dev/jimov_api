import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import index from "./routes/app.js";
import emit from "./routes/v1/anime/emitEpisodes.js";
import lastAdd from "./routes/v1/anime/lastEpisodes.js";
import lastEpisodes from "./routes/v1/anime/lastanimeAdd.js";
import animeInfo from "./routes/v1/anime/animeInfo.js";
import filter from "./routes/v1/anime/filterAnime.js";
import episode from "./routes/v1/anime/episode.js";
import helmet from "helmet";

const app = express();
const port = 3000;
//config
app.set("json spaces", 2);
//middleware
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//header
app.use(helmet()); //segurity
//routes
app.use(index, emit, lastAdd, lastEpisodes, animeInfo, filter, episode);

//init
app.listen(3000, () => {
  console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});
