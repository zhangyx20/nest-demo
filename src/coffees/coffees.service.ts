import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffees.entities';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    // throw new Error('some error');
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push({
      ...createCoffeeDto,
      id: this.coffees[this.coffees.length - 1]['id'] + 1,
    });
    return this.coffees[this.coffees.length - 1];
  }
}
