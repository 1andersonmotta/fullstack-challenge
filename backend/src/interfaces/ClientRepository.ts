import { ClientOrder } from "../domain/ClientOrder";

export interface ClientRepository {
    save(client: ClientOrder): Promise<ClientOrder>;
    findById(id: string): Promise<ClientOrder | undefined>;
    findAll(): Promise<ClientOrder[]>;
    delete(id: string): Promise<void>;
    deleteAll(): Promise<void>;
}
