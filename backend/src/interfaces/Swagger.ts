export interface Swagger {
    swagger: string;
    info: Info;
    host: string;
    basePath: string;
    schemes: string[];
    paths: { [key: string]: Path };
}

export interface Info {
    version: string;
    title: string;
    description: string;
}

export interface Path {
    get: Get;
    post: Post;
    put: Put;
    delete: Delete;
}

export interface Get {
    description: string;
    parameters: Parameter[];
    responses: Responses;
}

export interface Post {
    description: string;
    parameters: Parameter[];
    responses: Responses;
}

export interface Put {
    description: string;
    parameters: Parameter[];
    responses: Responses;
}

export interface Delete {
    description: string;
    parameters: Parameter[];
    responses: Responses;
}

export interface Parameter {
    name: string;
    in: string;
    type: string;
}

export interface Responses {
    "200": The200;
}

export interface The200 {
    description: string;
}
