import { DataTypes } from 'sequelize';
import db from '../database/database';

const Service = db.define('Service', {
    ServiceId: {
        field: 'ServiceId',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    ServiceName: {
        field: 'ServiceName',
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
}
);

//db.sync();

export default Service;
