import { Address } from "../domain/Address";

export type OrderCreateDto = {
    name: string;
    productWeight: number;
    latitude: number;
    longitude: number;
}

export interface OrderSaveDto extends Omit<OrderCreateDto, 'latitude' | 'longitude'> {
    id: string;
    address: Address;
}