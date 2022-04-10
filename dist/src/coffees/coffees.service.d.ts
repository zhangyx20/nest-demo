import { Model } from "mongoose";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffees.entities";
export declare class CoffeesService {
    private readonly coffeeModel;
    constructor(coffeeModel: Model<Coffee>);
    findAll(): Promise<(Coffee & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<Coffee & {
        _id: any;
    }>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee & {
        _id: any;
    }>;
    update(id: string, updateCoffeeDto: any): Promise<Coffee & {
        _id: any;
    }>;
}
