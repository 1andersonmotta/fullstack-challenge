import { AddressMemoryRepository } from './infra/repository/memory/AddressMemoryRepository';
import { GeoLocation } from './application/GeoLocation';
import { OrderService } from './application/OrderService';
import { AxiosAdapter } from './infra/adapter/AxiosAdapter';
import ExpressAdapter from './infra/adapter/ExpressAdapter';
import { ConfigEnv } from './infra/config/configuration';
import { OrderController } from './infra/controller/OrderController';
import { ClientMemoryRepository } from './infra/repository/memory/ClientMemoryRepository';
import express from 'express';

const PORT = ConfigEnv.server.port || 3000;

const app = express()
const expressAdapter = new ExpressAdapter(app);

const geolocation = new GeoLocation(new AxiosAdapter());
const orderService = new OrderService(new ClientMemoryRepository(), new AddressMemoryRepository());
new OrderController(expressAdapter, geolocation, orderService);

expressAdapter.listen(+PORT);