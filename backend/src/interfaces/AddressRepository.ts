import { Address } from "../domain/Address";

export interface AddressRepository {
    save(address: Address): Promise<Address>;
    findByClientOrderId(clientOrderId: string): Promise<Address>;
    findById(id: string): Promise<Address | undefined>;
    delete(id: string): Promise<void>;
}