import { Request, Response } from 'express';

export abstract class AbstractController {
    protected req!: Request;
    protected res!: Response
    next?: () => void;
    protected abstract start(): void;
}