import { Request, Response, Express } from "express";
export default interface ServerHttp {
	on(method: string, key: string, url: string, callback: (request: Request, response: Response) => void): void;
	listen(port: number): void;
}
