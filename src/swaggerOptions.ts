export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Apirest Ordenes Servicio',
            version: '1.0.0'
        },
        servers:[
            {
                url: "https://guarded-earth-58980.herokuapp.com/dev"
            }
        ]
    },
    apis: ["./src/routes/*.ts"],
}