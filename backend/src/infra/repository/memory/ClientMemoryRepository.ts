import { Address } from "../../../domain/Address";
import { ClientOrder } from "../../../domain/ClientOrder";
import { ClientRepository } from "../../../interfaces/ClientRepository";
import { TablePaginateResponse } from "../../../interfaces/TablePaginateResponse";

export class ClientMemoryRepository implements ClientRepository {
    private clients: ClientOrder[] = [];

    async save(client: ClientOrder): Promise<ClientOrder> {
        const clientExists = this.clients.find(clientEntity => clientEntity.id === client.id);
        if (clientExists) {
            const index = this.clients.findIndex(
                client => client.id === clientExists?.id
            );
            this.clients[index] = client;

        } else {
            this.clients.push(client);
        }
        const clientEntity = this.findById(client.id);
        return Promise.resolve(clientEntity) as Promise<ClientOrder>;
    }

    findAll(page: number, per_page: number = 5): Promise<TablePaginateResponse<ClientOrder>> {
        const total = this.clients.length;
        const total_pages = Math.ceil(total / per_page);
        const data = this.clients.slice((page - 1) * per_page, page * per_page);
        return Promise.resolve({
            page,
            per_page,
            total,
            total_pages,
            data
        });
    }

    async findById(id: string): Promise<ClientOrder | undefined> {
        const clientEntity = this.clients.find(client => client.id === id);
        return Promise.resolve(clientEntity);
    }


    async delete(id: string): Promise<void> {
        const index = this.clients.findIndex(client => client.id === id);
        this.clients.splice(index, 1);
        return Promise.resolve();
    }

    async deleteAll(): Promise<void> {
        this.clients = [];
        return Promise.resolve();
    }
}
