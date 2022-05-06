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
    serviceQueueCreate: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //
            let token = Math.random().toString().slice(2, 8);
            //Objetos de negocio            
            const serviceQueueModel = yield index_js_1.default.ServiceQueue.create({
                ServiceQueueToken: token,
            });
            //Guardar ServiceQueue
            yield serviceQueueModel.save();
            //Response
            return res.json({
                ok: true,
                serviceQueueCreated: serviceQueueModel
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
    })
};
