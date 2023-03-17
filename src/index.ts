import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import index from "./routes/app.js";
import flv from "./routes/v1/anime/animeflv/AnimeflvRoutes";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3000;

app.use(index);
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
app.use(flv);
/*animeflv*/


//init
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});
