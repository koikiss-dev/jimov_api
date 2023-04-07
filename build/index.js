"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const app_1 = tslib_1.__importDefault(require("./routes/app"));
const AnimeflvRoutes_1 = tslib_1.__importDefault(require("./routes/v1/anime/animeflv/AnimeflvRoutes"));
const AnimeLatinoHDRoutes_1 = tslib_1.__importDefault(require("./routes/v1/anime/animelatinohd/AnimeLatinoHDRoutes"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(app_1.default);
//config
app.set("json spaces", 2);
/*middleware*/
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
/*middleware*/
/*headers */
app.use((0, helmet_1.default)()); //segurity
/*headers */
//routes
/*animeflv*/
app.use(AnimeflvRoutes_1.default);
app.use(AnimeLatinoHDRoutes_1.default);
/*animeflv*/
//init
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port} listo para trabajar :)`);
});
//# sourceMappingURL=index.js.map