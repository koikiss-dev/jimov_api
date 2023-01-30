import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import index from "./routes/app.js";
import flv from './routes/v1/anime/animeflv/animeflvRoutes.js'
import zoroRout from './routes/v1/anime/zoro/animeZoroRoutes.js'
import helmet from "helmet";

const app = express();
const port = "https://jimov.herokuapp.com" || 3000;

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
app.use(zoroRout)
/*zoro */
//init
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});
