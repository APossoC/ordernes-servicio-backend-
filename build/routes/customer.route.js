"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const express_validator_1 = require("express-validator");
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const validate_field_helper_js_1 = __importDefault(require("../helpers/validate_field.helper.js"));
//Instanacia del routerx
const router = (0, express_promise_router_1.default)();
// Ruta Listar
router.get('/list', customer_controller_1.default.customerList);
//Ruta Crear
router.post('/create', [
    //CustomerName
    (0, express_validator_1.check)('CustomerName', 'CustomerName is required').not().isEmpty(),
    (0, express_validator_1.check)('CustomerName', 'CustomerName invalid').matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i"),
    (0, express_validator_1.check)('CustomerName', 'customer_name length min 10 and max 255').isLength({ min: 10, max: 255 }),
    //CustomerDni
    (0, express_validator_1.check)('CustomerDni', 'CustomerDni is required').not().isEmpty(),
    (0, express_validator_1.check)('CustomerDni', 'CustomerDni invalid').matches(/^[a-zA-Z0-9]+$/, "i"),
    (0, express_validator_1.check)('CustomerDni', 'CustomerDni length min 10 and max 15').isLength({ min: 2, max: 15 }),
    validate_field_helper_js_1.default.validateField
], customer_controller_1.default.customerCreate);
exports.default = router;
