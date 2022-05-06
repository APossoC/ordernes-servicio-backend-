import { Request, Response } from "express";
import models from "../models/index.js";
import { v4 as uuidv4 } from 'uuid';
import Technician from "../models/technician.models";

export default {
    serviceQueueCreate: async (req: Request, res: Response) => {
        try {

            //falta validar que el token no este registrado ya.
            //let token = Math.random().toString().slice(2, 8);

            //Objetos de negocio            
            const [totalRecords] = await Promise.all([
                models.Technician.count()
            ]);

            const serviceExists = await models.Service.findByPk(req.body.ServiceId);
            const customerExits = await models.Customer.findByPk(req.body.CustomerId);

            if (!serviceExists || !customerExits) return res.status(404).json({
                ok: false,
                msg: 'Customer or Services not found'
            });

            let technicianSort = Math.floor(Math.random() * totalRecords) + 1;

            //Guardar ServiceQueue
            if (totalRecords > 0 && serviceExists && customerExits) {
                const serviceQueueModel = await models.ServiceQueue.create({
                    ServiceQueueToken: uuidv4(),
                    ServiceId: req.body.ServiceId,
                    CustomerId: req.body.CustomerId,
                    TechnicianId: technicianSort
                });
                await serviceQueueModel.save();
                //Response
                return res.json({
                    ok: true,
                    serviceQueueCreated: serviceQueueModel
                });
            }
            return res.status(400).json({
                ok: false,
                msg: 'Technicians not created'
            });



        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Server error'
            });
        }

    },
    serviceQueueList: async (_: Request, res: Response) => {
        try {
            //Objetos de negocio y listar
            const [serviceQueueModel, totalRecords] = await Promise.all([
                models.ServiceQueue.findAll(),
                models.ServiceQueue.count()
            ]);
            //Response
            return res.json({
                ok: true,
                totalRecords,
                serviceQueueListed: serviceQueueModel
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Server error'
            });
        }
    },
    technicianFindByID: async (req: Request, res: Response) => {

        try {
            //Objetos de negocio
            const [serviceQueueExists, totalRecordsByTechnician] = await Promise.all([
                models.ServiceQueue.findAll({
                    include: {
                        model: Technician,
                        as: 'Technician',
                        where: { TechnicianId: req.params.TechnicianId }
                    }
                }),
                models.ServiceQueue.count({
                    include: {
                        model: Technician,
                        as: 'Technician',
                        where: { TechnicianId: req.params.TechnicianId }
                    }
                })
            ]);

            //Verificar Entidad Technician tiene dni repetidos
            if (!serviceQueueExists) {
                return res.status(404).json({
                    ok: false,
                    msg: 'TechnicianId dont exist'
                });
            }

            //Response
            return res.json({
                ok: true,
                totalRecordsByTechnician,
                serviceQueueListedByTechnician: serviceQueueExists
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Server error'
            });
        }

    }
}