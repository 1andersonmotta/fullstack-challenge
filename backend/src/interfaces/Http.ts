import { Request, Response } from "express";

export default interface Http {
	on(method: string, url: string, callback: (request: Request, response: Response) => void): void;
	listen(port: number): void;
}
