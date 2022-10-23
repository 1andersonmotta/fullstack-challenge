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

describe("OrderController", () => {
    test.skip("Buscar um endereço válido /search-address", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.get({
            url: "http://localhost:3000/api/orders/search-address?address=Rua%20das%20Flores",
        });
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ "latitude": "-25.4319606", "longitude": "-49.2736182" });
    })

    test.skip("Buscar um endereço inválido /search-address", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.get({
            url: "http://localhost:3000/api/orders/search-address?address=xxxxxxxxxxx",
        });
        expect(response.status).toBe(400);
        expect(response.data).toBe("Não foi possível obter a localização");
    })

    test("Deve listar os pedidos /orders", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.get({
            url: "http://localhost:3000/api/orders/orders?page=1&per_page=10",
        });
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            data: [],
            page: "1",
            per_page: "10",
            total: 0,
            total_pages: 0
        });
    })

    test("Deve cadastrar um pedido /orders", async () => {
        const axiosAdapter = new AxiosAdapter();
        const response = await axiosAdapter.post({
            url: "http://localhost:3000/api/orders/orders",
            data: bodyMock
        });
        expect(response.status).toBe(200);
        expect(response.data).toEqual({});
    })
})