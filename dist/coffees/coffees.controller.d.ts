import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { CoffeesService } from "./coffees.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    create(createCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    findAll(paginationQuery: PaginationQueryDto): Promise<import("./entities/coffee.entity").Coffee[]>;
    findOne(id: string): Promise<import("./entities/coffee.entity").Coffee>;
    update(id: string, body: any): Promise<import("./entities/coffee.entity").Coffee>;
    remove(id: string): Promise<import("./entities/coffee.entity").Coffee>;
}
