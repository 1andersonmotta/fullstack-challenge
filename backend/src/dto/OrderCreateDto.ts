import { Address } from "../domain/Address";

export type OrderCreateDto = {
    name: string;
    productWeight: number;
    searchAddress: string;
}

export interface OrderSaveDto extends Omit<OrderCreateDto, 'searchAddress'> {
    id: string;
    address: Address;
}