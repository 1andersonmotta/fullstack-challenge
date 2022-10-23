import ServerHttp from '../../interfaces/ServerHttp';
import cors from 'cors';
import express, { Request, Response, Express } from 'express';
import Logger from '../config/Logger';
import swaggerUi from 'swagger-ui-express';
import { ConfigEnv } from '../config/configuration';
import { setAttributes, swaggerJson } from '../../swagger';
import { swaggerState } from '../decorate/SwaggetDecorate';
export default class ExpressAdapter implements ServerHttp {
  constructor(readonly app: Express) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use('/public', express.static('public'));

    this.app.get('/api/', (req, res) => {
      res.status(200).send({
        message: 'Welcome to the API Fullstack Challenge',
        version: ConfigEnv.version,
      });
    });
  }

  on(method: string, url: string, key: string, callback: (req: Request, res: Response) => void): void {
    Logger.info(`[ ${method.toUpperCase()} ] - ${url}`);
    setAttributes(swaggerState, key, url, method);
    this.app[method as keyof Express](url, callback);
  }

  listen(port: number): void {
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJson))
    this.app.listen(port, () => {
      Logger.info(`Server running on port ${port}`);
    });
  }
}
