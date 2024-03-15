import { Flavor } from "./flavor";

export interface Product {
    id?: number;
    name?: string;
    flavorId?: number;
    flavorName: string;
    flavor?: Flavor;
    imageUrl?: string;
}
