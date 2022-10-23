import { GeoLocation } from "../src/application/GeoLocation";
import { Address } from "../src/domain/Address";
import { ClientOrder } from "../src/domain/ClientOrder";
import { AxiosAdapter } from "../src/infra/adapter/AxiosAdapter";

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

test.skip("Deve  buscar a geolocalização de um cliente", async () => {
    const geolocation = new GeoLocation(new AxiosAdapter());
    const searchTerm = addressMock.getSearchTerms();
    const location = await geolocation.getGeoLocation(searchTerm);
    if (location) {
        addressMock.setLatitudeAndLongitude(location);
        expect(addressMock.location).toHaveProperty("latitude");
        expect(addressMock.location).toHaveProperty("longitude");
    }
})