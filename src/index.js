import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import index from "./routes/app.js";
import flv from "./routes/v1/anime/animeflv/animeflvRoutes.js";
import zoroRout from "./routes/v1/anime/zoro/animeZoroRoutes.js";
import otakutv from "./routes/v1/anime/otakutv/otakutvRoute.js";
import animelatinoRoutes from "./routes/v1/anime/animelatinohd/animelatinohdRoutes.js";
import monoschinosRout from "./routes/v1/anime/monoschinos/monoschinosRoutes.js";
import nineAnime from "./routes/v1/anime/9anime/9animeRoute.js";
import tioanimeRout from './routes/v1/anime/tioanime/tioanimeRoutes.js'
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3000;

//config
app.set("json spaces", 2);

/*middleware*/
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
/*middleware*/

/*headers */
app.use(helmet()); //segurity
/*headers */

//routes

/*animeflv*/
app.use(index);
app.use(flv);
/*animeflv*/

/*zoro */
app.use(zoroRout);
/*zoro */

/* animelatinohd */

app.use(animelatinoRoutes);

/*otakutv */
app.use(otakutv);

/*monoschinos */
//app.use(monoschinosRout);
/*monoschinos */

/*tioanime */
app.use(tioanimeRout)

/*9anime */
app.use(nineAnime);

/*9anime */
//init
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});
