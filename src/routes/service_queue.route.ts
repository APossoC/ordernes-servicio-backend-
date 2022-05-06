import routerx from 'express-promise-router'
import { check } from 'express-validator'; 

import serviceQueueController from '../controllers/service_queue.controller';

import vField from '../helpers/validate_field.helper.js';

//Instanacia del routerx
const router = routerx();


//Ruta Listar
router.get('/list',
    serviceQueueController.serviceQueueList);

//Ruta Crear
router.post('/create'
    , [
        //CustomerId
        check('CustomerId', 'CustomerId is required').not().isEmpty(),
        check('CustomerId', 'CustomerId invalid').isNumeric(),
        //ServiceId
        check('ServiceId', 'ServiceId is required').not().isEmpty(),
        check('ServiceId', 'ServiceId invalid').isNumeric(),
        vField.validateField
    ], serviceQueueController.serviceQueueCreate
);

//Ruta Crear
router.get('/find/:TechnicianId'
    , [
        //TechnicianId
        check('TechnicianId', 'CustomerId is required').not().isEmpty(),
        check('TechnicianId', 'CustomerId invalid').isNumeric(),
        vField.validateField
    ], serviceQueueController.technicianFindByID
);

export default router;