import ServerHttp from '../../interfaces/ServerHttp';
import cors from 'cors';
import express, { Request, Response, Express } from 'express';
import { ConfigEnv } from '../config/configuration';
import Logger from '../config/Logger';

export default class ExpressAdapter implements ServerHttp {
  app!: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use('/public', express.static('public'));

    this.on("get", '/api/', (req, res) => {
      res.status(200).send({
        message: 'Welcome to the API Fullstack Challenge',
        version: ConfigEnv.version,
      });
    });
  }

  on(method: string, url: string, callback: (req: Request, res: Response) => void): void {
    Logger.info(`[ ${method.toUpperCase()} ] - ${url}`);
    this.app[method as keyof Express](url, callback);
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
