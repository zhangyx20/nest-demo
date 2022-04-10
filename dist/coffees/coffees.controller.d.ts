import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { CoffeesService } from "./coffees.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    create(createCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    findAll(protocol: string, paginationQuery: PaginationQueryDto): Promise<import("./entities/coffee.entity").Coffee[]>;
    findOne(id: number): Promise<import("./entities/coffee.entity").Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    remove(id: string): Promise<import("./entities/coffee.entity").Coffee>;
}
