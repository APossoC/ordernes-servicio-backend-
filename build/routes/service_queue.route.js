"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const express_validator_1 = require("express-validator");
const service_queue_controller_1 = __importDefault(require("../controllers/service_queue.controller"));
const validate_field_helper_js_1 = __importDefault(require("../helpers/validate_field.helper.js"));
//Instanacia del routerx
const router = (0, express_promise_router_1.default)();
//Ruta Listar
router.get('/list', service_queue_controller_1.default.serviceQueueList);
//Ruta Crear
router.post('/create', [
    //CustomerId
    (0, express_validator_1.check)('CustomerId', 'CustomerId is required').not().isEmpty(),
    (0, express_validator_1.check)('CustomerId', 'CustomerId invalid').isNumeric(),
    //ServiceId
    (0, express_validator_1.check)('ServiceId', 'ServiceId is required').not().isEmpty(),
    (0, express_validator_1.check)('ServiceId', 'ServiceId invalid').isNumeric(),
    validate_field_helper_js_1.default.validateField
], service_queue_controller_1.default.serviceQueueCreate);
//Ruta Crear
router.get('/find/:TechnicianId', [
    //TechnicianId
    (0, express_validator_1.check)('TechnicianId', 'CustomerId is required').not().isEmpty(),
    (0, express_validator_1.check)('TechnicianId', 'CustomerId invalid').isNumeric(),
    validate_field_helper_js_1.default.validateField
], service_queue_controller_1.default.technicianFindByID);
exports.default = router;
