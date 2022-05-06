"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('dfisgln0see6k9', 'egrhuzudthbwlq', 'b53cb6377e342e506998bcc84bfa251dcc8a5b9c93f356a4c47d91718b037640', {
    dialect: 'postgres',
    host: 'ec2-44-196-223-128.compute-1.amazonaws.com',
    //logging: false,
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});
exports.default = db;
/*export default {
    dbConnection: () => {
        try {
            const db = new Sequelize('os', 'ordenes', 'servicios', {
                dialect: 'postgres',
                host: 'localhost',
                //logging: false
            });
            //console.log('Conected to Bd: ' + db.getDatabaseName() + ', and is now Online');
            return db;
        } catch (error) {
            console.log(error);
            throw new Error('Error to start DB');
        }
    }
}*/
/*export default {
    init: () => {
        const sequelize = new Sequelize('os', 'ordenes', 'servicios', {
            host: 'localhost',
            dialect: 'postgres'
            // logging: false
        });
        // Sequelize will keep the connection open by default, and use the same connection for all queries.
        // If you need to close the connection, call sequelize.close() (which is asynchronous and returns a Promise).
        //console.log('Conected to Bd: ' + sequelize.getDatabaseName() + ', and is now Online');
        return sequelize;
    }
}*/
