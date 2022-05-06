"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const express_validator_1 = require("express-validator");
const technician_c_1 = __importDefault(require("../controllers/technician-c"));
const validate_field_h_js_1 = __importDefault(require("../helpers/validate_field-h.js"));
//Instanacia del routerx
const router = (0, express_promise_router_1.default)();
//Ruta Listar
router.get('/list', technician_c_1.default.technicianList);
//Ruta Crear
router.post('/create', [
    //TechnicianName
    (0, express_validator_1.check)('TechnicianName', 'TechnicianName is required').not().isEmpty(),
    (0, express_validator_1.check)('TechnicianName', 'TechnicianName invalid').matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i"),
    (0, express_validator_1.check)('TechnicianName', 'technician_name length min 10 and max 255').isLength({ min: 10, max: 255 }),
    //TechnicianDni
    (0, express_validator_1.check)('TechnicianDni', 'TechnicianDni is required').not().isEmpty(),
    (0, express_validator_1.check)('TechnicianDni', 'TechnicianDni invalid').matches(/^[a-zA-Z0-9]+$/, "i"),
    (0, express_validator_1.check)('TechnicianDni', 'TechnicianDni length min 10 and max 15').isLength({ min: 2, max: 15 }),
    validate_field_h_js_1.default.validateField
], technician_c_1.default.technicianCreate);
exports.default = router;
