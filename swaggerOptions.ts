import swaggerJsDoc from "swagger-jsdoc";

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API - Teste de programador pleno",
            version: "1.0.0"
        }
    },
    apis: ["./src/controllers/*.ts", "./swaggerSchemas.ts"]
}

export const specs = swaggerJsDoc(options);