import axios from "axios";
import { OrderService } from "../src/application/OrderService";
import { GeoLocation } from "../src/application/GeoLocation";
import { Address } from "../src/domain/Address";
import { ClientOrder } from "../src/domain/ClientOrder";
import Uuid from "../src/domain/helpers/Uuid";
import { Location } from "../src/domain/Location";
import { ClientMemoryRepository } from "../src/infra/repository/memory/ClientMemoryRepository";
import { AddressMemoryRepository } from "../src/infra/repository/memory/AddressMemoryRepository";
import { OrderCreateDto } from "../src/dto/OrderCreateDto";

const orderMock: OrderCreateDto = {
    name: "John Doe",
    productWeight: 10,
    address: {
        street: "Under the Lindens",
        city: "Berlin",
        complement: "Apt 6",
        country: "Alemanha",
        neighborhood: "Mitte",
        number: 1,
        state: "SP",
        zipCode: "18044-050",
    }
}

const clientOrderMock = new ClientOrder({
    name: orderMock.name,
    productWeight: orderMock.productWeight,
})

const addressMock = new Address({
    ...orderMock.address,
    clientOrderId: clientOrderMock.id
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
        const clientService = new OrderService(new ClientMemoryRepository(), new AddressMemoryRepository());
        const clientEntity = await clientService.save(orderMock);
        expect(clientEntity).toHaveProperty("id");
        expect(clientEntity).toHaveProperty("address");
        expect(clientEntity.address.clientOrderId).toBe(clientEntity.id);
        await clientService.delete(clientEntity.id);
    })

    test("Deve deletar um cliente", async () => {
        const clientService = new OrderService(new ClientMemoryRepository(), new AddressMemoryRepository());
        const clientEntity = await clientService.save(orderMock);
        await clientService.delete(clientEntity.id);
        try {
            await clientService.findById(clientEntity.id)
        } catch (error: any) {
            expect(error.message).toBe("Cliente não encontrado");
        }

    })

    test("Deve deletar todos os clientes", async () => {
        const clientService = new OrderService(new ClientMemoryRepository(), new AddressMemoryRepository());
        await clientService.save(orderMock);
        await clientService.save(orderMock);
        await clientService.save(orderMock);
        let client = await clientService.findAll(1);
        expect(client.data).toHaveLength(3);
        await clientService.deleteAll();
        client = await clientService.findAll(1);
        expect(client.data).toHaveLength(0);
    })
})
