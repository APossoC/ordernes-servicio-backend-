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
const service_queue_model_1 = __importDefault(require("../models/service_queue.model"));
exports.default = {
    technicianCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio
            const costumerExists = yield index_js_1.default.Technician.findOne({
                where: { TechnicianDni: req.body.TechnicianDni }
            });
            //Verificar Entidad Technician tiene dni repetidos
            if (costumerExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'technicianDni already taken'
                });
            }
            //Guardar Technician            
            const costumerModel = yield index_js_1.default.Technician.create(Object.assign({}, req.body));
            yield costumerModel.save();
            //Response
            return res.json({
                ok: true,
                technicianCreated: costumerModel
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
    technicianList: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio y listar
            const [technicianModel, totalRecords] = yield Promise.all([
                index_js_1.default.Technician.findAll(),
                index_js_1.default.Technician.count()
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
    }),
    technicianFindByID: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio
            const serviceQueueExists = yield index_js_1.default.Technician.findAll({
                include: {
                    model: service_queue_model_1.default,
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
    })
};
