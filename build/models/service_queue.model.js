"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const service_model_1 = __importDefault(require("./service.model"));
const customer_model_1 = __importDefault(require("./customer.model"));
const technician_models_1 = __importDefault(require("./technician.models"));
const ServiceQueue = database_1.default.define('ServiceQueue', {
    ServiceQueueId: {
        field: 'ServiceQueueId',
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    ServiceQueueToken: {
        field: 'ServiceQueueToken',
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: "ServiceQueueCreatedAt",
    updatedAt: false
});
ServiceQueue.belongsTo(service_model_1.default, {
    foreignKey: 'ServiceId',
    as: 'Service',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
ServiceQueue.belongsTo(customer_model_1.default, {
    foreignKey: 'CustomerId',
    as: 'Customer',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
ServiceQueue.belongsTo(technician_models_1.default, {
    foreignKey: 'TechnicianId',
    as: 'Technician',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
//db.sync();
exports.default = ServiceQueue;
