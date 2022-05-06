import { DataTypes } from 'sequelize';
import db from '../database/database';
import Service from './service.model';
import Customer from './customer.model';
import Technician from './technician.models';

const ServiceQueue = db.define('ServiceQueue', {

    ServiceQueueId: {
        field: 'ServiceQueueId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    ServiceQueueToken: {
        field: 'ServiceQueueToken',
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: "ServiceQueueCreatedAt",
    updatedAt: false
}
);

ServiceQueue.belongsTo(Service, {
    foreignKey: 'ServiceId',
    as: 'Service',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ServiceQueue.belongsTo(Customer, {
    foreignKey: 'CustomerId',
    as: 'Customer',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ServiceQueue.belongsTo(Technician, {
    foreignKey: 'TechnicianId',
    as: 'Technician',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//db.sync();

export default ServiceQueue;
