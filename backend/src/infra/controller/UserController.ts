import { AbstractController, IRequest, IResponse } from '../../interfaces/AbstractController';
import ServerHttp from '../../interfaces/ServerHttp';
import { ConfigEnv } from '../config/configuration';
import { Controller, Get } from '../decorate/HttpDecorate';

@Controller('/api/users')
export default class UserController extends AbstractController {

  constructor(readonly http: ServerHttp) {
    super();
    this.start();
  }

  @Get('/me')
  private getMe(req: IRequest, res: IResponse) {
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
