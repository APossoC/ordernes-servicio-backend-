import routerx from 'express-promise-router'
import { check } from 'express-validator';

import customerController from '../controllers/customer.controller';

import vField from '../helpers/validate_field.helper.js';

//Instanacia del routerx
const router = routerx();
// Ruta Listar
router.get('/list',
    customerController.customerList);
//Ruta Crear
router.post('/create'
    , [
        //CustomerName
        check('CustomerName', 'CustomerName is required').not().isEmpty(),
        check('CustomerName', 'CustomerName invalid').matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i"),
        check('CustomerName', 'customer_name length min 10 and max 255').isLength({ min: 10, max: 255 }),
        //CustomerDni
        check('CustomerDni', 'CustomerDni is required').not().isEmpty(),
        check('CustomerDni', 'CustomerDni invalid').matches(/^[a-zA-Z0-9]+$/, "i"),
        check('CustomerDni', 'CustomerDni length min 10 and max 15').isLength({ min: 2, max: 15 }),
        vField.validateField
    ], customerController.customerCreate
);

export default router;