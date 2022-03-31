import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeesService } from './coffees.service';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    create(createCoffeeDto: CreateCoffeeDto): import("./entities/coffees.entities").Coffee;
    findAll(): import("./entities/coffees.entities").Coffee[];
    findOne(id: string): import("./entities/coffees.entities").Coffee;
    update(id: string, body: any): string;
    remove(id: string): string;
}
