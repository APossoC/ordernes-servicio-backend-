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
    customerCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio            
            const customerExists = yield index_js_1.default.Customer.findOne({
                where: { CustomerDni: req.body.CustomerDni }
            });
            //Verificar Entidad Customer tiene dni repetidos
            if (customerExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'customerDni already taken'
                });
            }
            else {
                //Guardar Customer            
                const customerModel = yield index_js_1.default.Customer.create(Object.assign({}, req.body));
                yield customerModel.save();
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
    }),
    customerList: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Objetos de negocio y listar
            const [customerModel, totalRecords] = yield Promise.all([
                index_js_1.default.Customer.findAll(),
                index_js_1.default.Customer.count()
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
    })
};
