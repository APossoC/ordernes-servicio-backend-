import { Request, Response } from "express";
import models from "../models/index.js";
import ServiceQueue from "../models/service_queue.model";

export default {
    technicianCreate: async (req: Request, res: Response) => {
        try {
            //Objetos de negocio
            const costumerExists = await models.Technician.findOne({
                where: { TechnicianDni: req.body.TechnicianDni }
            });

            //Verificar Entidad Technician tiene dni repetidos
            if (costumerExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'technicianDni already taken'
                });
            } else {
                //Guardar Technician             
                const costumerModel = await models.Technician.create({ ...req.body });
                await costumerModel.save();
                //Response
                return res.json({
                    ok: true,
                    technicianCreated: costumerModel
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Server error'
            });
        }

    },
    technicianList: async (_: Request, res: Response) => {
        try {
            //Objetos de negocio y listar
            const [technicianModel, totalRecords] = await Promise.all([
                models.Technician.findAll(),
                models.Technician.count()
            ]);
            //Response
            res.json({
                ok: true,
                totalRecords,
                technicianListed: technicianModel
            });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Server error'
            });
        }
    },
    technicianFindByID: async (req: Request, res: Response) => {

        try {
            //Objetos de negocio
            const serviceQueueExists = await models.Technician.findAll({
                include: {
                    model: ServiceQueue,
                    as: 'ServiceQueue',
                    where: { TechnicianId: req.params.TechnicianId }
                }
            });

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
                technicianCreated: serviceQueueExists
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