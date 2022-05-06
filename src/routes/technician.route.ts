import routerx from 'express-promise-router'
import { check } from 'express-validator';

import technicianController from '../controllers/technician.controller';

import vField from '../helpers/validate_field.helper';

//Instanacia del routerx
const router = routerx();


//Ruta Listar
router.get('/list',
    technicianController.technicianList);

//Ruta Crear
router.post('/create'
    , [
        //TechnicianName
        check('TechnicianName', 'TechnicianName is required').not().isEmpty(),
        check('TechnicianName', 'TechnicianName invalid').matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i"),
        check('TechnicianName', 'technician_name length min 10 and max 255').isLength({ min: 10, max: 255 }),
        //TechnicianDni
        check('TechnicianDni', 'TechnicianDni is required').not().isEmpty(),
        check('TechnicianDni', 'TechnicianDni invalid').matches(/^[a-zA-Z0-9]+$/, "i"),
        check('TechnicianDni', 'TechnicianDni length min 10 and max 15').isLength({ min: 2, max: 15 }),
        vField.validateField
    ], technicianController.technicianCreate
);


export default router;