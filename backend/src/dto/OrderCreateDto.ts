import { Address, InputAddress } from "../domain/Address";

export type OrderCreateDto = {
    name: string;
    productWeight: number;
    address: Omit<InputAddress, 'id' | 'clientOrderId'>;
}

export interface OrderSaveDto extends OrderCreateDto {
    id: string;
    address: Address;
}