"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../models/index.js"));
const uuid_1 = require("uuid");
const technician_models_1 = __importDefault(require("../models/technician.models"));
exports.default = {
    serviceQueueCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //falta validar que el token no este registrado ya.
            //let token = Math.random().toString().slice(2, 8);
            //Objetos de negocio            
            const [totalRecords] = yield Promise.all([
                index_js_1.default.Technician.count()
            ]);
            const serviceExists = yield index_js_1.default.Service.findByPk(req.body.ServiceId);
            const customerExits = yield index_js_1.default.Customer.findByPk(req.body.CustomerId);
            if (!serviceExists || !customerExits)
                return res.status(404).json({
                    ok: false,
                    msg: 'Customer or Services not found'
                });
            let technicianSort = Math.floor(Math.random() * totalRecords) + 1;
            //Guardar ServiceQueue
            if (totalRecords > 0 && serviceExists && customerExits) {
                const serviceQueueModel = yield index_js_1.default.ServiceQueue.create({
                    ServiceQueueToken: (0, uuid_1.v4)(),
                    ServiceId: req.body.ServiceId,
                    CustomerId: req.body.CustomerId,
                    TechnicianId: technicianSort
                });
                yield serviceQueueModel.save();
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
    }),
    serviceQueueList: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio y listar
            const [serviceQueueModel, totalRecords] = yield Promise.all([
                index_js_1.default.ServiceQueue.findAll(),
                index_js_1.default.ServiceQueue.count()
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
    }),
    technicianFindByID: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio
            const [serviceQueueExists, totalRecordsByTechnician] = yield Promise.all([
                index_js_1.default.ServiceQueue.findAll({
                    include: {
                        model: technician_models_1.default,
                        as: 'Technician',
                        where: { TechnicianId: req.params.TechnicianId }
                    }
                }),
                index_js_1.default.ServiceQueue.count({
                    include: {
                        model: technician_models_1.default,
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
    })
};
