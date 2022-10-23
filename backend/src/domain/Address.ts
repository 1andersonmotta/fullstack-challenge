import Uuid from "./helpers/Uuid";
import { Location } from "./Location";

export class Address {
    id: string;
    clientOrderId: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    complement: string;
    location?: Location;

    constructor(inputAddress: InputAddress) {
        this.id = inputAddress.id || Uuid.generate();
        this.clientOrderId = inputAddress.clientOrderId;
        this.street = inputAddress.street;
        this.number = inputAddress.number;
        this.neighborhood = inputAddress.neighborhood;
        this.city = inputAddress.city;
        this.state = inputAddress.state;
        this.zipCode = inputAddress.zipCode;
        this.country = inputAddress.country;
        this.complement = inputAddress.complement;
        if (inputAddress.location) {
            this.location = inputAddress.location;
        }
    }

    getSearchTerms(): string {
        return `${this.street} ${this.number} ${this.city} ${this.country}`
    }

    setClientOrderId(clientOrderId: string) {
        this.clientOrderId = clientOrderId;
    }

    setLatitudeAndLongitude(location: Location) {
        this.location = new Location({
            latitude: location.latitude,
            longitude: location.longitude
        });
    }
}

export type InputAddress = {
    id?: string;
    clientOrderId: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    complement: string;
    location?: Location;
}