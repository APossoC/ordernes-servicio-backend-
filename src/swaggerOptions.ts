export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Apirest Ordenes Servicio',
            version: '1.0.0'
        },
        servers:[
            {
                url: "http://localhost:3000/dev"
            }
        ]
    },
    apis: ["./src/routes/*.ts"],
}