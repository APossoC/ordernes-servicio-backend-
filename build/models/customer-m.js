"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const Customer = database_1.default.define('Customer', {
    CustomerId: {
        field: 'CustomerId',
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    CustomerName: {
        field: 'CustomerName',
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    CustomerDni: {
        field: 'CustomerDni',
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});
database_1.default.sync();
exports.default = Customer;
