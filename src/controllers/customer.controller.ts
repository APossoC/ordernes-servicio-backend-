import { Request, Response } from "express";
import models from "../models/index.js";



export default {
    customerCreate: async (req: Request, res: Response) => {
        try {
            //Objetos de negocio            
            const customerExists = await models.Customer.findOne({
                where: { CustomerDni: req.body.CustomerDni }
            });

            //Verificar Entidad Customer tiene dni repetidos
            if (customerExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'customerDni already taken'
                });
            } else {

                //Guardar Customer            
                const customerModel = await models.Customer.create({ ...req.body });
                await customerModel.save();

                //Response
                return res.json({
                    ok: true,
                    customerCreated: customerModel
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
    customerList: async (_: Request, res: Response) => {
        try {
            //Objetos de negocio y listar
            const [customerModel, totalRecords] = await Promise.all([
                models.Customer.findAll(),
                models.Customer.count()
            ]);
            //Response
            return res.json({
                ok: true,
                totalRecords,
                customerListed: customerModel
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