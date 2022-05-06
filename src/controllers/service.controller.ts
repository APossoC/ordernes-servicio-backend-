import { Request, Response } from "express";
import models from "../models/index.js";

export default {
    serviceCreate: async (req:Request, res:Response) => {
        try {
            //Objetos de negocio            
            const serviceExists = await models.Service.findOne({
                where: { ServiceName: req.body.ServiceName }
            });

            //Verificar Entidad Service tiene dni repetidos
            if (serviceExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ServiceName already taken'
                });
            }

            //Guardar Service
            const serviceModel = await models.Service.create({ ...req.body });
            await serviceModel.save();

            //Response
            return res.json({
                ok: true,
                serviceCreated: serviceModel
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
    serviceList: async (_: Request,res:Response) => {
        try {
             //Objetos de negocio y listar
            const [serviceModel, totalRecords] = await Promise.all([
                models.Service.findAll(),
                models.Service.count()
            ]);
             //Response
            res.json({
                ok: true,
                totalRecords,
                serviceListed: serviceModel
            });

        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Server error'
            });
        }
    }
}