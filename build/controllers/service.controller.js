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
exports.default = {
    serviceCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio            
            const serviceExists = yield index_js_1.default.Service.findOne({
                where: { ServiceName: req.body.ServiceName }
            });
            //Verificar Entidad Service tiene dni repetidos
            if (serviceExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ServiceName already taken'
                });
            }
            else {
                //Guardar Service
                const serviceModel = yield index_js_1.default.Service.create(Object.assign({}, req.body));
                yield serviceModel.save();
                //Response
                return res.json({
                    ok: true,
                    serviceCreated: serviceModel
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
    }),
    serviceList: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio y listar
            const [serviceModel, totalRecords] = yield Promise.all([
                index_js_1.default.Service.findAll(),
                index_js_1.default.Service.count()
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
    })
};
