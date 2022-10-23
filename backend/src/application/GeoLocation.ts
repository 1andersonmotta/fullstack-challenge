import axios from "axios";
import { Address } from "../domain/Address";
import { Location } from "../domain/Location";

export class GeoLocation {

    static async getGeoLocation(address: Address): Promise<Location | undefined> {
        const query = address.getSearchTerms();
        const response = await axios.get(`https://nominatim.openstreetmap.org/search/${query}?format=json&limit=1`);
        if (response.status === 200) {
            const location = new Location({
                latitude: Number(response.data[0].lat),
                longitude: Number(response.data[0].lon)
            });
            return location;
        }
        return;
    }
}