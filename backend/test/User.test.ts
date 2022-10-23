import axios from "axios";
import { ClientService } from "../src/application/ClientService";
import { GeoLocation } from "../src/application/GeoLocation";
import { Address } from "../src/domain/Address";
import { ClientOrder } from "../src/domain/ClientOrder";
import Uuid from "../src/domain/helpers/Uuid";
import { Location } from "../src/domain/Location";
import { ClientMemoryRepository } from "../src/infra/repository/memory/ClientMemoryRepository";

const clientMock = new ClientOrder({
    name: "John Doe",
    productWeight: 10
});

const addressMock = new Address({
    clientOrderId: clientMock.id,
    street: "Under the Lindens",
    city: "Berlin",
    complement: "Apt 6",
    country: "Alemanha",
    neighborhood: "Mitte",
    number: 1,
    state: "SP",
    zipCode: "18044-050",
})

describe("Client", () => {
    test("Deve gerar um novo cliente", () => {
        const clientOrder = new ClientOrder({
            name: "João",
            productWeight: 10,

        });

        expect(clientOrder).toHaveProperty("id");
        expect(clientOrder).toHaveProperty("name");
        expect(clientOrder).toHaveProperty("productWeight");
    })

    test("Deve salvar um novo cliente", async () => {
        const clientService = new ClientService(new ClientMemoryRepository());
        const clientEntity = await clientService.save(clientMock);
        expect(clientEntity).toEqual(clientMock);
        await clientService.delete(clientEntity.id);
    })

    test("Deve deletar um cliente", async () => {
        const clientService = new ClientService(new ClientMemoryRepository());
        const clientEntity = await clientService.save(clientMock);
        expect(clientEntity).toEqual(clientMock);
        await clientService.delete(clientEntity.id);
        const client = await clientService.findById(clientEntity.id);
        expect(client).toBeUndefined();
    })

    test("Deve deletar todos os clientes", async () => {
        const clientService = new ClientService(new ClientMemoryRepository());
        await clientService.save({ ...clientMock, id: Uuid.generate() });
        await clientService.save({ ...clientMock, id: Uuid.generate() });
        await clientService.save({ ...clientMock, id: Uuid.generate() });
        let client = await clientService.findAll(1);
        expect(client.data).toHaveLength(3);
        await clientService.deleteAll();
        client = await clientService.findAll(1);
        expect(client.page).toBe(1);
        expect(client.data).toHaveLength(0);
    })
})
