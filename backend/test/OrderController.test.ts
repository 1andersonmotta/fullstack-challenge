import { OrderSaveDto } from './../src/dto/OrderCreateDto';
import { OrderCreateDto } from "../src/dto/OrderCreateDto";
import { AxiosAdapter } from "../src/infra/adapter/AxiosAdapter";

test("Verificar se api está de pé", async () => {
    const axiosAdapter = new AxiosAdapter();
    const response = await axiosAdapter.get<{ message: string, version: string }>({
        url: "http://localhost:3000/api",
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Welcome to the API Fullstack Challenge");
});

const bodyMock: OrderCreateDto = {
    name: "John Doe",
    productWeight: 10,
    latitude: 10,
    longitude: 10,
}

describe("OrderController", () => {
    test.skip("Buscar um endereço válido /search-address", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.get({
            url: "http://localhost:3000/api/v1/search-address?address=Rua%20das%20Flores",
        });
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ "latitude": "-25.4319606", "longitude": "-49.2736182" });
    })

    test.skip("Buscar um endereço inválido /search-address", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.get({
            url: "http://localhost:3000/api/v1/search-address?address=xxxxxxxxxxx",
        });
        expect(response.status).toBe(400);
        expect(response.data).toBe("Não foi possível obter a localização");
    })

    test("Deve listar os pedidos /orders", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.get({
            url: "http://localhost:3000/api/v1/orders?page=1&per_page=10",
        });
        expect(response.status).toBe(200);

    })

    test("Deve cadastrar um pedido /orders", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.post<OrderSaveDto>({
            url: "http://localhost:3000/api/v1/orders",
            data: bodyMock as any
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty("id");
        expect(response.data).toHaveProperty("address");
        expect(response.data.address.clientOrderId).toBe(response.data.id);
        await axiosAdapter.delete({
            url: "http://localhost:3000/api/v1/orders-all",
        });
    })

    test("Deve deletar um pedido /orders/:id", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.post<OrderSaveDto>({
            url: "http://localhost:3000/api/orders/v1",
            data: bodyMock as any
        });
        await axiosAdapter.delete({
            url: `http://localhost:3000/api/v1/orders/${response.data.id}`,
        });
        const response2 = await axiosAdapter.get({
            url: `http://localhost:3000/api/v1/orders/${response.data.id}`,
        });
        expect(response2.status).toBe(404);
    })
})