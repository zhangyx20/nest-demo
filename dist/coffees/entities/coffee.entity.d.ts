import { Flavor } from "./flavor.entity";
export declare class Coffee {
    id: number;
    brand: string;
    recommendations: number;
    flavors: Flavor[];
}