
export class Location {
    latitude: number;
    longitude: number;
    constructor(inputLocation: InputLocation) {
        this.latitude = inputLocation.latitude;
        this.longitude = inputLocation.longitude;
    }
}

export type InputLocation = {
    latitude: number;
    longitude: number;
}
