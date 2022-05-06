"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const Technician = database_1.default.define('Technician', {
    TechnicianId: {
        field: 'CustomerId',
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    TechnicianName: {
        field: 'TechnicianName',
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    TechnicianDni: {
        field: 'TechnicianDni',
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});
//db.sync();
exports.default = Technician;
