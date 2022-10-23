import Uuid from "./helpers/Uuid";

export class ClientOrder {
    id: string
    name: string;
    productWeight: number;

    constructor(inputClient: InputClient) {
        this.id = inputClient.id || Uuid.generate()
        this.name = inputClient.name;
        this.productWeight = inputClient.productWeight;
    }

}

export type InputClient = {
    id?: string
    name: string;
    productWeight: number;
}