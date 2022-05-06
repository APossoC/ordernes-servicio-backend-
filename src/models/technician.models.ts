import {  DataTypes } from 'sequelize';
import db from '../database/database';

const Technician = db.define('Technician', {
    TechnicianId: {
        field: 'CustomerId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    TechnicianName: {
        field: 'TechnicianName',
        type: DataTypes.STRING,
        allowNull: false
    },
    TechnicianDni: {
        field: 'TechnicianDni',
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
}
);

//db.sync();

export default Technician;
