import { GeoLocation } from './../../application/GeoLocation';
import { AbstractController, IRequest, IResponse } from '../../interfaces/AbstractController';
import ServerHttp from '../../interfaces/ServerHttp';
import { Controller, Delete, Get, Post } from '../decorate/HttpDecorate';
import { OrderService } from '../../application/OrderService';
import { OrderCreateDto } from '../../dto/OrderCreateDto';

@Controller('/api/v1')
export class OrderController extends AbstractController {

  constructor(readonly http: ServerHttp, readonly geolocation: GeoLocation, readonly orderService: OrderService) {
    super();
    this.start();
  }

  @Get('/search-address')
  private async getMe(req: IRequest<any, any, SearchAddressQuery>, res: IResponse) {
    const { address } = req.query;
    try {
      const location = await this.geolocation.getGeoLocation(address);
      res.status(200).send(location);
    } catch (error: any) {
      res.status(error.code || 500).send(error.message || "Internal Server Error");
    }
  }

  @Get('/orders/:id')
  private async getOrdersById(req: IRequest, res: IResponse) {
    const { id } = req.params;
    try {
      const order = await this.orderService.findById(id);
      res.status(200).send(order);
    } catch (error: any) {
      res.status(error.code || 500).send(error.message || "Internal Server Error");
    }
  }

  @Get('/orders')
  private async getOrders(req: IRequest<any, any, OrdersQuery>, res: IResponse) {
    const { page, per_page } = req.query;
    try {
      const orders = await this.orderService.findAll(page, per_page);
      res.status(200).send(orders);
    }
    catch (error: any) {
      res.status(error.code || 500).send(error.message || "Internal Server Error");
    }
  }

  @Post('/orders')
  private async postOrders(req: IRequest<any, OrderCreateDto>, res: IResponse) {
    try {
      const order = await this.orderService.save(req.body);
      res.status(201).send(order);
    }
    catch (error: any) {
      res.status(error.code || 500).send(error.message || "Internal Server Error");
    }
  }

  @Delete('/orders-all')
  private async deleteOrders(req: IRequest, res: IResponse) {
    try {
      await this.orderService.deleteAll();
      res.status(200).send();
    }
    catch (error: any) {
      res.status(error.code || 500).send(error.message || "Internal Server Error");
    }
  }


  public start() {
    this.getMe(this.req, this.res);
    this.getOrders(this.req, this.res);
    this.postOrders(this.req, this.res);
    this.deleteOrders(this.req, this.res);
    this.getOrdersById(this.req, this.res);
  }
}

type OrdersQuery = {
  page: number,
  per_page: number,
}

type SearchAddressQuery = {
  address: string;
};