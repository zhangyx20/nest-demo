import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffees.entities";
import { Repository } from "typeorm";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
export declare class CoffeesService {
  private readonly coffeeRepository;
  constructor(coffeeRepository: Repository<Coffee>);
  findAll(): Promise<Coffee[]>;
  findOne(id: string): Promise<Coffee>;
  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
  update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
  remove(id: string): Promise<Coffee>;
}
