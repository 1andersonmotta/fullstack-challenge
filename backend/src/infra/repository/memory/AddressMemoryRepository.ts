import { Address } from "../../../domain/Address";
import { AddressRepository } from "../../../interfaces/AddressRepository";

export class AddressMemoryRepository implements AddressRepository {
    private addresses: Address[] = [];

    async save(address: Address): Promise<Address> {
        this.addresses.push(address);
        return address;
    }

    async findByClientOrderId(clientOrderId: string): Promise<Address> {
        const address = this.addresses.find(address => address.clientOrderId === clientOrderId);
        if (!address) {
            throw new Error("Endereço não encontrado");
        }
        return address;
    }

    async findById(id: string): Promise<Address | undefined> {
        return this.addresses.find(address => address.id === id);
    }

    async delete(id: string): Promise<void> {
        this.addresses = this.addresses.filter(address => address.id !== id);
    }
}