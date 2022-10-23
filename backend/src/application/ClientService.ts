import { ClientOrder } from "../domain/ClientOrder";
import { ClientRepository } from "../interfaces/ClientRepository";
import { TablePaginateResponse } from "../interfaces/TablePaginateResponse";

export class ClientService {

    constructor(private clientRepository: ClientRepository) { }

    async save(client: ClientOrder): Promise<ClientOrder> {
        try {
            return await this.clientRepository.save(client);
        } catch (error) {
            throw new Error("Erro ao salvar cliente");
        }
    }

    async findAll(page: number, per_page: number = 5): Promise<TablePaginateResponse<ClientOrder>> {
        try {
            return await this.clientRepository.findAll(page, per_page);
        } catch (error) {
            throw new Error("Erro ao buscar clientes");
        }
    }

    async findById(id: string): Promise<ClientOrder | undefined> {
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
            throw new Error("Erro ao deletar cliente");
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