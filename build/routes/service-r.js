"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const express_validator_1 = require("express-validator");
const service_c_1 = __importDefault(require("../controllers/service-c"));
const validate_field_h_js_1 = __importDefault(require("../helpers/validate_field-h.js"));
//Instanacia del routerx
const router = (0, express_promise_router_1.default)();
//Ruta Listar
router.get('/list', service_c_1.default.serviceList);
//Ruta Crear
router.post('/create', [
    //ServiceName
    (0, express_validator_1.check)('ServiceName', 'ServiceName is required').not().isEmpty(),
    (0, express_validator_1.check)('ServiceName', 'ServiceName invalid').matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i"),
    (0, express_validator_1.check)('ServiceName', 'service_name length min 10 and max 255').isLength({ min: 10, max: 255 }),
    validate_field_h_js_1.default.validateField
], service_c_1.default.serviceCreate);
exports.default = router;
