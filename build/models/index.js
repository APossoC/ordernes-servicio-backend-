"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = __importDefault(require("./customer.model"));
const technician_models_1 = __importDefault(require("./technician.models"));
const service_model_1 = __importDefault(require("./service.model"));
const service_queue_model_1 = __importDefault(require("./service_queue.model"));
const database_1 = __importDefault(require("../database/database"));
database_1.default.sync();
exports.default = {
    Customer: customer_model_1.default,
    Technician: technician_models_1.default,
    Service: service_model_1.default,
    ServiceQueue: service_queue_model_1.default
};
