import { DataTypes } from 'sequelize';
import db from '../database/database';

const Customer = db.define('Customer', {
    CustomerId: {
        field: 'CustomerId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    CustomerName: {
        field: 'CustomerName',
        type: DataTypes.STRING,
        allowNull: false
    },
    CustomerDni: {
        field: 'CustomerDni',
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
}
);

//db.sync();

export default Customer;
