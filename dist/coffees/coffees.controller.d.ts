import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { CoffeesService } from "./coffees.service";
export declare class CoffeesController {
  private readonly coffeesService;
  constructor(coffeesService: CoffeesService);
  create(createCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffees.entities").Coffee>;
  findAll(): Promise<import("./entities/coffees.entities").Coffee[]>;
  findOne(id: string): Promise<import("./entities/coffees.entities").Coffee>;
  update(id: string, body: any): Promise<import("./entities/coffees.entities").Coffee>;
  remove(id: string): string;
}
