import express, { Response } from 'express';
import cors from 'cors';
import db from './database/database';
import morgan from 'morgan';
import router from './routes/index.js';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from './swaggerOptions';


// Crear el servidor express
const app = express();

// Instanciar Morgan 
app.use(morgan('dev'));

//Configurar Cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
console.log('Conected to Bd: ' + db.getDatabaseName() + ', and is now Online');

//database.dbConnection();

//Rutas
app.use('/dev',router);

// Parametrizar Swagger
const swaggerDocs = swaggerJsDoc(options);
// Instancia Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
console.log(swaggerDocs);

//Test
app.get('/test', (_, res: Response) => {
  res.status(200).send({ info: 'Node.js, Express, and Postgres API' });
});

//Asignacion de puerto para instanciar el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('Server Running on port: ', process.env.PORT || 3000);
});