import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffees.entities';
export declare class CoffeesService {
    private coffees;
    findAll(): Coffee[];
    findOne(id: string): Coffee;
    create(createCoffeeDto: CreateCoffeeDto): Coffee;
}
