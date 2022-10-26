import { Address } from "../domain/Address";
import { ClientOrder } from "../domain/ClientOrder";
import { Location } from "../domain/Location";
import { OrderCreateDto, OrderSaveDto } from "../dto/OrderCreateDto";
import { AddressRepository } from "../interfaces/AddressRepository";
import { ClientRepository } from "../interfaces/ClientRepository";
import { TablePaginateResponse } from "../interfaces/TablePaginateResponse";
import { GeoLocation } from "./GeoLocation";

export class OrderService {

    constructor(
        private clientRepository: ClientRepository,
        readonly addressRepository: AddressRepository,
        readonly geolocation: GeoLocation
    ) { }

    async save(order: OrderCreateDto): Promise<OrderSaveDto> {
        try {
            const responseData = await this.geolocation.getAddressByLatLng(order.latitude, order.longitude);

            const orderEntity = await this.clientRepository.save(new ClientOrder({
                name: order.name,
                productWeight: order.productWeight,
            }));

            const addressEntity = await this.addressRepository.save(new Address({
                clientOrderId: orderEntity.id,
                city: responseData.address.city,
                complement: "",
                country: responseData.address.country,
                neighborhood: responseData.address.suburb,
                number: responseData.address?.house_number || "",
                state: responseData.address.state,
                street: responseData.address.road,
                zipCode: responseData.address.postcode,
                location: new Location({
                    latitude: responseData.lat,
                    longitude: responseData.lon
                })
            }));

            return {
                ...orderEntity,
                address: addressEntity
            }
        } catch (error) {
            console.log(error);

            throw new Error("Erro ao salvar cliente");
        }
    }

    async findAll(page: number, per_page: number = 5): Promise<TablePaginateResponse<OrderSaveDto>> {
        try {
            const order = await this.clientRepository.findAll(page, per_page);
            const orderSaveDto: OrderSaveDto[] = [];
            for (const orderEntity of order.data) {
                const addressEntity = await this.addressRepository.findByClientOrderId(orderEntity.id);
                orderSaveDto.push({
                    ...orderEntity,
                    address: addressEntity
                });
            }
            return {
                ...order,
                data: orderSaveDto
            }
        } catch (error) {
            throw new Error("Erro ao buscar clientes");
        }
    }

    async findById(id: string): Promise<ClientOrder> {
        try {
            return await this.clientRepository.findById(id);
        } catch (error: any) {
            throw error
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.clientRepository.delete(id);
        } catch (error) {
            throw error
        }
    }

    async deleteAll(): Promise<void> {
        try {
            await this.clientRepository.deleteAll();
        } catch (error) {
            throw new Error("Erro ao deletar todos os clientes");
        }
    }
}