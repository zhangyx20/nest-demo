import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { CoffeesService } from "./coffees.service";
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    create(createCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffees.entities").Coffee & {
        _id: any;
    }>;
    findAll(): Promise<(import("./entities/coffees.entities").Coffee & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<import("./entities/coffees.entities").Coffee & {
        _id: any;
    }>;
    update(id: string, body: any): string;
    remove(id: string): string;
}
