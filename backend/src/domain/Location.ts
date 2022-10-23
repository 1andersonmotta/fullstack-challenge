
export class Location {
    latitude: string;
    longitude: string;
    constructor(inputLocation: InputLocation) {
        this.latitude = inputLocation.latitude;
        this.longitude = inputLocation.longitude;
    }
}

export type InputLocation = {
    latitude: string;
    longitude: string;
}
