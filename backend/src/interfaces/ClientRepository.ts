import { ClientOrder } from "../domain/ClientOrder";
import { TablePaginateResponse } from "./TablePaginateResponse";

export interface ClientRepository {
    save(client: ClientOrder): Promise<ClientOrder>;
    findById(id: string): Promise<ClientOrder | undefined>;
    findAll(page: number, per_page?: number): Promise<TablePaginateResponse<ClientOrder>>;
    delete(id: string): Promise<void>;
    deleteAll(): Promise<void>;
}


