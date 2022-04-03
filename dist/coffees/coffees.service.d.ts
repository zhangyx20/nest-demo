import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffee.entity";
import { Connection, Repository } from "typeorm";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from "./entities/flavor.entity";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly connection;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>, connection: Connection);
    findAll(pagination: PaginationQueryDto): Promise<Coffee[]>;
    findOne(id: string): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: string): Promise<Coffee>;
    private preloadFlavorByName;
    recommendCoffee(coffee: Coffee): Promise<void>;
}
