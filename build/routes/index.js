"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Objetos globales
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const customer_route_1 = __importDefault(require("./customer.route"));
const technician_route_1 = __importDefault(require("./technician.route"));
const service_route_1 = __importDefault(require("./service.route"));
const service_queue_route_1 = __importDefault(require("./service_queue.route"));
//Instanacia del routerx
const router = (0, express_promise_router_1.default)();
//Tags Swagger
/**
 * @swagger
 * tags:
 *  -   name: Customers
 *      description: Endpoint para todo lo relacionado con Clientes
 *  -   name: Services
 *      description: Endpoint para todo lo relacionado con Servicios prestados
 *  -   name: Technicians
 *      description: Endpoint para todo lo relacionado con tecnicos de AA
 */
//Schemas Swagger
/**
 * @swagger
 * components:
 *  schemas:
 *      Customer:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              totalRecords:
 *                  type: number
 *                  description: Retorna la cantidad registros en la tabla
 *              customerListed:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          CustomerId:
 *                              type: number
 *                              description: Id de tabla Customer
 *                          CustomerName:
 *                              type: string
 *                              description: Nombre completo del Cliente
 *                          CustomerDni:
 *                              type: string
 *                              description: Numero de identificacion del Cliente
 *          example: # Sample object
 *              ok: true
 *              totalRecords: 2
 *              customerListed:
 *                  -   CustomerId: 1
 *                      CustomerName: "Alberto Posso"
 *                      CustomerDni: "1143364998"
 *                  -   CustomerId: 2
 *                      CustomerName: "Jeniffer Caraballo"
 *                      CustomerDni: "1143363940"
 *      CustomerCreateResponse:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              customerCreated:
 *                  type: object
 *                  properties:
 *                      CustomerId:
 *                          type: number
 *                          description: Id de tabla Customer
 *                      CustomerName:
 *                          type: string
 *                          description: Nombre completo del Cliente
 *                      CustomerDni:
 *                          type: string
 *                          description: Numero de identificacion del Cliente
 *          example: # Sample object
 *              ok: true
 *              customerCreated:
 *                  CustomerId: 1
 *                  CustomerName: "Alberto Posso"
 *                  CustomerDni: "1143364998"
 *      CustomerCreate:
 *          type: object
 *          properties:
 *              CustomerName:
 *                  type: string
 *                  description: Nombre completo del Cliente
 *              CustomerDni:
 *                  type: string
 *                  description: Numero de identificacion del Cliente
 *          example: # Sample object
 *              CustomerName: "Alberto Posso"
 *              CustomerDni: "1143364998"
 *          required:
 *              -   CustomerName
 *              -   CustomerDni
 *      CustomerNameUnique:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: customerName already taken
 *      CustomerDniUnique:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: CustomerDni already taken
 *      Service:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              totalRecords:
 *                  type: number
 *                  description: Retorna la cantidad registros en la tabla
 *              serviceListed:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          ServiceId:
 *                              type: number
 *                              description: Id de tabla Service
 *                          ServiceName:
 *                              type: string
 *                              description: Nombre completo del Servicio
 *          example: # Sample object
 *              ok: true
 *              totalRecords: 2
 *              serviceListed:
 *                  -   ServiceId: 1
 *                      ServiceName: "Servicio 1"
 *      ServiceCreate:
 *          type: object
 *          properties:
 *              ServiceName:
 *                  type: string
 *                  description: Nombre del servicio
 *          example: # Sample object
 *              ServiceName: "Servicio 1"
 *          required:
 *              -   ServiceName
 *      ServiceCreateResponse:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              serviceCreated:
 *                  type: object
 *                  properties:
 *                      ServiceId:
 *                          type: number
 *                          description: Id de tabla Service
 *                      ServiceName:
 *                          type: string
 *                          description: Nombre del Servicio
 *          example: # Sample object
 *              ok: true
 *              serviceCreated:
 *                  ServiceId: 1
 *                  ServiceName: "Servicio 1"
 *      ServiceNameUnique:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: serviceName already taken
 *      Technician:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              totalRecords:
 *                  type: number
 *                  description: Retorna la cantidad registros en la tabla
 *              technicianListed:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          TechnicianId:
 *                              type: number
 *                              description: Id de tabla Technician
 *                          TechnicianName:
 *                              type: string
 *                              description: Nombre completo del Tecnico
 *                          TechnicianDni:
 *                              type: string
 *                              description: Numero de identificacion del Tecnico
 *          example: # Sample object
 *              ok: true
 *              totalRecords: 2
 *              technicianListed:
 *                  -   TechnicianId: 1
 *                      TechnicianName: "Tecnico 111"
 *                      TechnicianDni: "11111111111"
 *                  -   TechnicianId: 2
 *                      TechnicianName: "Tecnico 222"
 *                      TechnicianDni: "22222222222"
 *      TechnicianCreateResponse:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              technicianCreated:
 *                  type: object
 *                  properties:
 *                      TechnicianId:
 *                          type: number
 *                          description: Id de tabla Technician
 *                      TechnicianName:
 *                          type: string
 *                          description: Nombre completo del Tecnico
 *                      TechnicianDni:
 *                          type: string
 *                          description: Numero de identificacion del Tecnico
 *          example: # Sample object
 *              ok: true
 *              technicianCreated:
 *                  TechnicianId: 1
 *                  TechnicianName: "Tecnico 111"
 *                  TechnicianDni: "11111111111"
 *      TechnicianCreate:
 *          type: object
 *          properties:
 *              TechnicianName:
 *                  type: string
 *                  description: Nombre completo del Tecnico
 *              TechnicianDni:
 *                  type: string
 *                  description: Numero de identificacion del Tecnico
 *          example: # Sample object
 *              TechnicianName: "Tecnico 111"
 *              TechnicianDni: "11111111111"
 *          required:
 *              -   TechnicianName
 *              -   TechnicianDni
 *      TechnicianNameUnique:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: technicianName already taken
 *      TechnicianDniUnique:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: TechnicianDni already taken
 *      ServiceQueueCreateResponse:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              serviceQueueCreated:
 *                  type: object
 *                  properties:
 *                      ServiceQueueId:
 *                          type: number
 *                          description: Id de tabla ServiceQueue
 *                      ServiceQueueToken:
 *                          type: string
 *                          description: Token unico de servicio generado automaticamente
 *                      ServiceId:
 *                          type: number
 *                          description: Fk de tabla Service en la tabla ServiceQueue
 *                      CustomerId:
 *                          type: number
 *                          description: Fk de tabla Customer en la tabla ServiceQueue
 *                      TechnicianId:
 *                          type: number
 *                          description: Fk de tabla Technician en la tabla ServiceQueue
 *                      ServiceQueueCreatedAt:
 *                          type: string
 *                          description: Fecha de generacion del servicio
 *          example: # Sample object
 *              ok: true
 *              serviceQueueCreated:
 *                  ServiceQueueId: 1
 *                  ServiceQueueTokens: dbe5a74e-3d47-4c44-b21f-57adb25ec4ad
 *                  ServiceId: 1
 *                  CustomerId: 2
 *                  TechnicianId: 3
 *                  ServiceQueueCreatedAt: 2022-05-06T02:56:03.784Z
 *      ServiceQueueCreate:
 *          type: object
 *          properties:
 *              ServiceId:
 *                  type: number
 *                  description: Fk de tabla Service en la tabla ServiceQueue
 *              CustomerId:
 *                  type: number
 *                  description: Fk de tabla Customer en la tabla ServiceQueue
 *          example: # Sample object
 *              ServiceId: 1
 *              CustomerId: 1
 *          required:
 *              -   ServiceId
 *              -   CustomerId
 *      ServiceQueueFkExists:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: Customer or Services not found
 *      ServiceQueueTechniciansExist:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              msg:
 *                  type: string
 *                  description: Respuesta del servidor
 *          example: # Sample object
 *              ok: false,
 *              msg: Technicians not created
 *      ServiceQueueByPkTecnicianResponse:
 *          type: object
 *          properties:
 *              ok:
 *                  type: boolean
 *                  description: Validacion de respuesta
 *              totalRecordsByTechnician:
 *                  type: number
 *                  description: Retorna la cantidad registros en la tabla por cada tecnico
 *              serviceQueueListedByTechnician:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          ServiceQueueId:
 *                              type: number
 *                              description: Id de tabla ServiceQueue
 *                          ServiceQueueToken:
 *                              type: string
 *                              description: Token unico de servicio generado automaticamente
 *                          ServiceQueueCreatedAt:
 *                              type: string
 *                              description: Fecha de generacion del servicio
 *                          ServiceId:
 *                              type: number
 *                              description: Fk de tabla Service en la tabla ServiceQueue
 *                          CustomerId:
 *                              type: number
 *                              description: Fk de tabla Customer en la tabla ServiceQueue
 *                          TechnicianId:
 *                              type: number
 *                              description: Fk de tabla Technician en la tabla ServiceQueue
 *                          Technician:
 *                              type: object
 *                              properties:
 *                                      TechnicianId:
 *                                          type: number
 *                                          description: Id de tabla Technician
 *                                      TechnicianName:
 *                                          type: string
 *                                          description: Nombre completo del Tecnico
 *                                      TechnicianDni:
 *                                          type: string
 *                                          description: Numero de identificacion del Tecnico
 *          example: # Sample object
 *              ok: true
 *              totalRecordsByTechnician: 2
 *              serviceQueueListed:
 *                  -   ServiceQueueId: 1
 *                      ServiceQueueToken: "a581be45-df20-45b6-a245-f86dab7d4570"
 *                      ServiceQueueCreatedAt: "2022-05-05T04:08:13.346Z"
 *                      ServiceId: 1
 *                      CustomerId: 1
 *                      TechnicianId: 3
 *                      Technician:
 *                          TechnicianId: 3
 *                          TechnicianName: "TechnicianName3"
 *                          TechnicianDni: "99999993"
 *                  -   ServiceQueueId: 2
 *                      ServiceQueueToken: "faaa3ba5-a3e7-4384-9ad3-c8909467aac1"
 *                      ServiceQueueCreatedAt: "2022-05-05T04:08:18.693Z"
 *                      ServiceId: 1
 *                      CustomerId: 1
 *                      TechnicianId: 3
 *                      Technician:
 *                          TechnicianId: 3
 *                          TechnicianName: "TechnicianName3"
 *                          TechnicianDni: "99999993"
 */
//Docs Swagger Customer List
/**
 * @swagger
 * /customer/list:
 *  get:
 *      summary: Obtiene lista de clientes
 *      tags:
 *       - Customers
 *      responses:
 *          200:
 *              description: Lista de clientes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Customer'
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
//Docs Swagger Customer Create
/**
 * @swagger
 * /customer/create:
 *  post:
 *      summary: Registra clientes en el apirest
 *      tags:
 *       - Customers
 *      requestBody:
 *          description: Campos requeridos de tipo json en el body
 *          required: true
 *          content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CustomerCreate'
 *      responses:
 *          200:
 *              description: Cliente Registrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/CustomerCreateResponse'
 *          400:
 *              description: Error Nombre de cliente o Dni de cliente existente
 *              content:
 *                  application/json:
 *                      schema:
 *                          oneOf:
 *                             - $ref: '#/components/schemas/CustomerNameUnique'
 *                             - $ref: '#/components/schemas/CustomerDniUnique'
 *          403:
 *              description: Campos Requeridos
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  description: Validacion de respuesta
 *                              errors:
 *                                  type: string
 *                                  description: Errores mapeados en json
 *                          example: # Sample object
 *                                  ok: false,
 *                                  errors:
 *                                      CustomerName:
 *                                          msg: CustomerName is required
 *                                          param: CustomerName
 *                                          location: body
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
router.use('/customer', customer_route_1.default);
//Docs Swagger Service List
/**
 * @swagger
 * /service/list:
 *  get:
 *      summary: Obtiene lista de servicios
 *      tags:
 *       - Services
 *      responses:
 *          200:
 *              description: Lista de servicios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Service'
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
//Docs Swagger Service Create
/**
 * @swagger
 * /service/create:
 *  post:
 *      summary: Registra servicios en el apirest
 *      tags:
 *       - Services
 *      requestBody:
 *          description: Campos requeridos de tipo json en el body
 *          required: true
 *          content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ServiceCreate'
 *      responses:
 *          200:
 *              description: Servicio Registrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/ServiceCreateResponse'
 *          400:
 *              description: Error Nombrel servicio repetido
 *              content:
 *                  application/json:
 *                      schema:
 *                          oneOf:
 *                             - $ref: '#/components/schemas/ServiceNameUnique'
 *          403:
 *              description: Campos Requeridos
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  description: Validacion de respuesta
 *                              errors:
 *                                  type: string
 *                                  description: Errores mapeados en json
 *                          example: # Sample object
 *                                  ok: false,
 *                                  errors:
 *                                      ServiceName:
 *                                          msg: ServiceName is required
 *                                          param: ServiceName
 *                                          location: body
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
router.use('/service', service_route_1.default);
//Docs Swagger Technician List
/**
 * @swagger
 * /technician/list:
 *  get:
 *      summary: Obtiene lista de tecnicos
 *      tags:
 *       - Technicians
 *      responses:
 *          200:
 *              description: Lista de tecnicos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Technician'
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
//Docs Swagger Technician Create
/**
 * @swagger
 * /technician/create:
 *  post:
 *      summary: Registra tecnicos en el apirest
 *      tags:
 *       - Technicians
 *      requestBody:
 *          description: Campos requeridos de tipo json en el body
 *          required: true
 *          content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/TechnicianCreate'
 *      responses:
 *          200:
 *              description: Tecnico Registrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/TechnicianCreateResponse'
 *          400:
 *              description: Error Nombre de tecnico o Dni de tecnico existente
 *              content:
 *                  application/json:
 *                      schema:
 *                          oneOf:
 *                             - $ref: '#/components/schemas/TechnicianNameUnique'
 *                             - $ref: '#/components/schemas/TechnicianDniUnique'
 *          403:
 *              description: Campos Requeridos
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  description: Validacion de respuesta
 *                              errors:
 *                                  type: string
 *                                  description: Errores mapeados en json
 *                          example: # Sample object
 *                                  ok: false,
 *                                  errors:
 *                                      TechnicianName:
 *                                          msg: TechnicianName is required
 *                                          param: TechnicianName
 *                                          location: body
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
router.use('/technician', technician_route_1.default);
//Docs Swagger ServiceQueue FindByFkTechnician
/**
 * @swagger
 * /service_queue/find/{TecnicianId}:
 *  get:
 *      summary: Obtiene las ordenes de servicios asignadas por cada tecnico
 *      tags:
 *       - Technicians
 *      parameters:
 *          - in: path
 *            name: TecnicianId
 *            required: true
 *            schema:
 *              type: integer
 *            description: Id del tecnico a buscar
 *      responses:
 *          200:
 *              description: Lista y cuantifica las ordenes de servicio asignadas por cada tecico
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/ServiceQueueByPkTecnicianResponse'
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
//Docs Swagger ServiceQueue Create
/**
 * @swagger
 * /service_queue/create:
 *  post:
 *      summary: Registra las ordenes de servicio en el apirest
 *      tags:
 *       - Customers
 *      requestBody:
 *          description: Campos requeridos de tipo json en el body
 *          required: true
 *          content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ServiceQueueCreate'
 *      responses:
 *          200:
 *              description: Tecnico Registrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/ServiceQueueCreateResponse'
 *          400:
 *              description: Error no hay tecnicos creados
 *              content:
 *                  application/json:
 *                      schema:
 *                          oneOf:
 *                             - $ref: '#/components/schemas/ServiceQueueTechniciansExist'
 *          403:
 *              description: Campos Requeridos
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  description: Validacion de respuesta
 *                              errors:
 *                                  type: string
 *                                  description: Errores mapeados en json
 *                          example: # Sample object
 *                                  ok: false,
 *                                  errors:
 *                                      CustomerId:
 *                                          msg: CustomerId is required
 *                                          param: CustomerId
 *                                          location: body
 *          404:
 *              description: Error no hay existen los Fk ingresados
 *              content:
 *                  application/json:
 *                      schema:
 *                          oneOf:
 *                             - $ref: '#/components/schemas/ServiceQueueFkExists'
 *          500:
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                              properties:
 *                                  ok:
 *                                      type: boolean
 *                                      description: Validacion de respuesta
 *                                  msg:
 *                                      type: string
 *                                      description: Respuesta del servidor
 *                              example: # Sample object
 *                                  ok: false,
 *                                  msg: Server error
 */
router.use('/service_queue', service_queue_route_1.default);
exports.default = router;
