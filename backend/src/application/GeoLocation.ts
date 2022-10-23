import axios from "axios";
import { Address } from "../domain/Address";
import { Location } from "../domain/Location";
import { BadRequest } from "../infra/helpers/ErrorHandlers";
import { ClientHttp } from "../interfaces/ClientHttp";

export class GeoLocation {

    constructor(readonly http: ClientHttp) { }

    async getGeoLocation(searchTerm: string): Promise<Location> {
        try {
            const response = await this.http.get<NominatimResponse[]>({
                url: `https://nominatim.openstreetmap.org/search/${searchTerm}?format=json&limit=1`
            });

            if (response.status !== 200 || !response.data.length) throw BadRequest("Não foi possível obter a localização");
            const location = new Location({
                latitude: response.data[0].lat,
                longitude: response.data[0].lon
            });
            return location;
        } catch (error) {
            throw error
        }
    }
}

interface NominatimResponse {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
}
