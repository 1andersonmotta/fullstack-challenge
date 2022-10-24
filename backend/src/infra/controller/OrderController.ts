import { GeoLocation } from './../../application/GeoLocation';
import { AbstractController, IRequest, IResponse } from '../../interfaces/AbstractController';
import ServerHttp from '../../interfaces/ServerHttp';
import { Controller, Delete, Get, Post } from '../decorate/HttpDecorate';
import { OrderService } from '../../application/OrderService';
import { OrderCreateDto } from '../../dto/OrderCreateDto';
import { SwaggerDescription, SwaggerResponse, SwaggerParams, SwaggerBody } from '../decorate/SwaggetDecorate';
import Uuid from '../../domain/helpers/Uuid';
import { Location } from '../../domain/Location';

@Controller('/api/v1')
export class OrderController extends AbstractController {

  constructor(readonly http: ServerHttp, readonly geolocation: GeoLocation, readonly orderService: OrderService) {
    super();
    this.start();
  }

  @SwaggerDescription('Search latitude and longitude by address')
  @SwaggerParams({
    name: 'address',
    inType: 'query',
  })
  @SwaggerResponse({
    status: 200,
    description: 'Search latitude and longitude by address',
    schema: {
      latitude: "52.5166879",
      longitude: "13.3860417",
    }
  })
  @SwaggerResponse({
    status: 404,
    description: 'Order not found',
  })
  @Get('/search-address')
  private async getMe(req: IRequest, res: IResponse) {
    const { address } = req.query;
    try {

      const data = await this.geolocation.getGeoLocation(address);
      res.status(200).send(new Location({
        latitude: data.lat,
        longitude: data.lon,
      }));
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

  @SwaggerDescription('Get all orders')
  @SwaggerResponse({
    status: 200,
    description: 'Get all orders',
    schema: {
      page: 1,
      per_page: 10,
      total: 3,
      averageTicket: 5333.333333333333,
      weigh_total: 16000,
      total_pages: 10,
      data: [
        {
          id: "f6f57414-29d6-4270-85fa-0a7150a92fcf",
          name: "John Doe",
          productWeight: 10,
          address: {
            id: Uuid.generate(),
            clientOrderId: "f6f57414-29d6-4270-85fa-0a7150a92fcf",
            street: "Under the Lindens",
            city: "Berlin",
            complement: "Apt 6",
            country: "Alemanha",
            neighborhood: "Mitte",
            number: 1,
            state: "BL",
            zipCode: "18044",
          }
        }]
    }
  })
  @SwaggerParams({
    name: 'page',
    inType: 'query',
  })
  @SwaggerParams({
    name: 'per_page',
    inType: 'query',
  })
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

  @SwaggerDescription('Create order')
  @SwaggerBody({
    name: 'OrderCreateDto',
    description: 'OrderCreateDto',
    schema: {
      name: "John Doe",
      productWeight: 1000,
      searchAddress: "Under the Lindens, Berlin",
    }
  })
  @SwaggerResponse({
    status: 201,
    description: 'Order created',
    schema: {
      name: "John Doe",
      productWeight: 10,
      address: {
        street: "Under the Lindens",
        city: "Berlin",
        complement: "Apt 6",
        country: "Alemanha",
        neighborhood: "Mitte",
        number: 1,
        state: "BL",
        zipCode: "18044",
      }
    }
  })
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

  @SwaggerDescription('Delete all orders')
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