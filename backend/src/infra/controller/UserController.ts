import { AbstractController } from '../../interfaces/Controller';
import { Request, Response } from 'express';
import Http from '../../interfaces/Http';
import { ConfigEnv } from '../config/configuration';
import { Controller, Get } from '../decorate/ExpressDecorate';

@Controller('/api/users')
export default class UserController extends AbstractController {

  constructor(readonly http: Http) {
    super();
    this.start();
  }

  @Get('/me')
  private getMe(req: Request, res: Response) {
    try {
      res.status(200).send({
        message: 'Welcome to the API Fullstack Challenge',
        version: ConfigEnv.version,
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  public start() {
    this.getMe(this.req, this.res);
  }
}
