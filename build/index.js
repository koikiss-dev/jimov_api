"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var app_1 = __importDefault(require("./routes/app"));
var AnimeflvRoutes_1 = __importDefault(require("./routes/v1/anime/animeflv/AnimeflvRoutes"));
var AnimeLatinoHDRoutes_1 = __importDefault(require("./routes/v1/anime/animelatinohd/AnimeLatinoHDRoutes"));
var helmet_1 = __importDefault(require("helmet"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
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
app.listen(port, function () {
    console.log("Servidor iniciado en el puerto ".concat(port, " listo para trabajar :)"));
});
//# sourceMappingURL=index.js.map