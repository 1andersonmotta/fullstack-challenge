import axios from "axios";
import { Address } from "../domain/Address";
import { Location } from "../domain/Location";
import Logger from "../infra/config/Logger";
import { BadRequest } from "../infra/helpers/ErrorHandlers";
import { ClientHttp } from "../interfaces/ClientHttp";

export class GeoLocation {

    constructor(readonly http: ClientHttp) { }

    async getGeoLocation(searchTerm: string): Promise<NominatimResponse> {
        try {
            Logger.info(`Search address ${searchTerm}`)
            const response = await this.http.get<NominatimResponse[]>({
                url: `https://nominatim.openstreetmap.org/search/${searchTerm}?format=json&addressdetails=1&limit=1`
            });
            if (response.status !== 200 || !response.data.length) throw BadRequest("Não foi possível obter a localização");
            Logger.info(`Search success ${searchTerm}`)
            return response.data[0];
        } catch (error) {
            Logger.error(error)
            throw error
        }
    }

    async getAddressByLatLng(lat: number, lng: number): Promise<NominatimResponse> {
        try {
            Logger.info(`Search address by latlng ${lat} ${lng}`)
            const response = await this.http.get<NominatimResponse>({
                url: `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`
            });
            if (response.status !== 200) throw BadRequest("Não foi possível obter a localização");
            Logger.info(`Search success by latlng ${lat} ${lng}`)
            return response.data;
        } catch (error) {
            Logger.error(error)
            throw error
        }
    }

}
export interface NominatimResponse {
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
    address: AddressNominatim;
}

export interface AddressNominatim {
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    municipality: string;
    county: string;
    state_district: string;
    state: string;
    "ISO3166-2-lvl4": string;
    house_number: string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
}
