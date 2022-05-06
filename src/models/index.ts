import Customer from './customer.model';
import Technician from './technician.models';
import Service from './service.model';
import ServiceQueue from './service_queue.model';
import db from '../database/database';

db.sync();
export default {
    Customer,
    Technician,
    Service,
    ServiceQueue
}


