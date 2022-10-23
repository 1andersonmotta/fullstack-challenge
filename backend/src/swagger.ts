import { Swagger } from "./interfaces/Swagger";

export const swaggerJson: Swagger = {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "Fullstack Challenge",
        description: "Fullstack Challenge",
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    paths: {}
}


export function setAttributes(obj: any, propertyKey: string, path: string, method: string) {
    if (obj[propertyKey]) {
        swaggerJson.paths = {
            ...swaggerJson.paths,
            [path]: {
                ...swaggerJson.paths[path],
                [method]: {
                    description: obj[propertyKey].description,
                    parameters: obj[propertyKey].parameters,
                    responses: obj[propertyKey].responses,
                }
            }
        } as any
    }
}