"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database/database"));
const morgan_1 = __importDefault(require("morgan"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = require("./swaggerOptions");
// Crear el servidor express
const app = (0, express_1.default)();
// Instanciar Morgan 
app.use((0, morgan_1.default)('dev'));
//Configurar Cors
app.use((0, cors_1.default)());
//Lectura y parseo del body
app.use(express_1.default.json());
//Base de datos
console.log('Conected to Bd: ' + database_1.default.getDatabaseName() + ', and is now Online');
//database.dbConnection();
//Rutas
app.use('/dev', index_js_1.default);
// Parametrizar Swagger
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
// Instancia Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
console.log(swaggerDocs);
//Test
app.get('/test', (_, res) => {
    res.status(200).send({ info: 'Node.js, Express, and Postgres API' });
});
//Asignacion de puerto para instanciar el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log('Server Running on port: ', process.env.PORT || 3000);
});
