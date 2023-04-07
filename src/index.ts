import express from "express";
import morgan from "morgan";
import index from "./routes/app";
import providersList from './routes/providers'
import flv from "./routes/v1/anime/animeflv/AnimeflvRoutes";
import latinhd from "./routes/v1/anime/animelatinohd/AnimeLatinoHDRoutes";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3000;

app.use(index);
app.use(providersList)
//config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(helmet());

//routes

/*animeflv*/
app.use(flv);
app.use(latinhd);
/*animeflv*/


//init
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});
