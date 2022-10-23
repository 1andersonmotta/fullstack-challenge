import { IController } from "./HttpDecorate";

export const swaggerState = {} as any

function SwaggerDescription(description: string) {
    return function (target: any, propertyKey: string, descriptor: IController) {
        const methodOriginal = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            let result;
            swaggerState[propertyKey] = {
                ...swaggerState[propertyKey],
                description,
            }
            result = await methodOriginal.apply(this, args);
            return result;
        }
    }
}

function SwaggerParams(params: { name: string, inType: 'query' | 'path', required?: boolean, value?: any, description?: string, type?: string }) {
    const { name, required, description, type, value, inType } = params;
    return function (target: any, propertyKey: string, descriptor: IController) {
        const methodOriginal = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            let result;
            if (!swaggerState[propertyKey].parameters) {
                swaggerState[propertyKey] = {
                    ...swaggerState[propertyKey],
                    parameters: []
                }
            }
            swaggerState[propertyKey].parameters.push(
                {
                    name,
                    required: required || false,
                    value: value || null,
                    description: description || null,
                    type: type || "string",
                    in: inType || 'query',
                }
            )
            result = await methodOriginal.apply(this, args);

            return result;
        }
    }
}

function SwaggerBody(params: { name: string, required?: boolean, description?: string, schema?: any }) {
    const { name, required, description, schema } = params;
    return function (target: any, propertyKey: string, descriptor: IController) {
        const methodOriginal = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            let result;
            const schemaObject = {} as any;
            if (schema) {
                for (const key in schema) {
                    if (typeof schema[key] === 'object') {
                        for (const keyArray in schema[key]) {
                            schemaObject[key] = {
                                example: {
                                    ...schemaObject[key]?.example,
                                    [keyArray]: schema[key][keyArray]
                                }
                            }
                        }
                        continue
                    }
                    schemaObject[key] = { example: schema[key] };
                }
            }
            if (!swaggerState[propertyKey].parameters) {
                swaggerState[propertyKey] = {
                    ...swaggerState[propertyKey],
                    parameters: []
                }
            }
            swaggerState[propertyKey].parameters.push({
                name,
                required: required || false,
                description: description || null,
                in: "body",
                schema: schema ? {
                    type: 'object',
                    properties: schemaObject,
                } : null,
            })
            result = await methodOriginal.apply(this, args);

            return result;
        }
    }
}

function SwaggerResponse(params: { description?: string, schema?: any, status: number }) {
    const { description, schema, status } = params;
    return function (target: any, propertyKey: string, descriptor: IController) {
        const methodOriginal = descriptor.value;
        const schemaObject = {} as any;
        if (schema) {
            for (const key in schema) {
                if (typeof schema[key] === 'object') {
                    for (const keyArray in schema[key]) {
                        schemaObject[key] = {
                            example: {
                                ...schemaObject[key]?.example,
                                [keyArray]: schema[key][keyArray]
                            }
                        }
                    }
                    continue
                }
                schemaObject[key] = { example: schema[key] };
            }
        }
        descriptor.value = async function (...args: any[]) {
            let result;
            swaggerState[propertyKey] = {
                ...swaggerState[propertyKey],
                responses: {
                    ...swaggerState[propertyKey]?.responses,
                    [status]: {
                        description,
                        type: "object",
                        schema: schema ? {
                            type: 'object',
                            properties: schemaObject,
                        } : null,
                    }
                }
            }
            result = await methodOriginal.apply(this, args);
            return result;
        }
    }
}

export { SwaggerDescription, SwaggerParams, SwaggerResponse, SwaggerBody };