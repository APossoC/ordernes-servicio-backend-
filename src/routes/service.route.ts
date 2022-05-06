import routerx from 'express-promise-router'
import { check } from 'express-validator';

import serviceController from '../controllers/service.controller';

import vField from '../helpers/validate_field.helper.js';

//Instanacia del routerx
const router = routerx();


//Ruta Listar
router.get('/list',
    serviceController.serviceList);

//Ruta Crear
router.post('/create'
    , [
        //ServiceName
        check('ServiceName', 'ServiceName is required').not().isEmpty(),
        check('ServiceName', 'ServiceName invalid').matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i"),
        check('ServiceName', 'service_name length min 10 and max 255').isLength({ min: 10, max: 255 }),
        vField.validateField
    ], serviceController.serviceCreate
);

export default router;