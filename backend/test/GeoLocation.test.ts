import { GeoLocation } from "../src/application/GeoLocation";
import { Location } from "../src/domain/Location";
import { OrderCreateDto } from "../src/dto/OrderCreateDto";
import { AxiosAdapter } from "../src/infra/adapter/AxiosAdapter";

const bodyMock: OrderCreateDto = {
    name: "John Doe",
    productWeight: 10,
    searchAddress: "Under the Lindens, Berlin"
}

test.skip("Deve  buscar a geolocalização de um cliente", async () => {
    const geolocation = new GeoLocation(new AxiosAdapter());
    const responseData = await geolocation.getGeoLocation(bodyMock.searchAddress);
    const location = new Location({
        latitude: responseData.lat,
        longitude: responseData.lon
    })
    if (location) {
        expect(location).toHaveProperty("latitude");
        expect(location).toHaveProperty("longitude");
    }
})