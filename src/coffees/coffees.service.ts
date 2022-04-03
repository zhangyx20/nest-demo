import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffees.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}
  // not need anymore
  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: "Shipwreck Roast",
  //     brand: "Buddy Brew",
  //     flavors: ["chocolate", "vanilla"],
  //   },
  // ];

  // findAll() {
  //   return this.coffees;
  // }

  findAll() {
    return this.coffeeRepository.find();
  }

  // findOne(id: number) {
  //   // throw new Error('some error');
  //   const coffee = this.coffees.find((item) => item.id === +id);
  //   if (!coffee) {
  //     throw new NotFoundException(`Coffee #${id} not found`);
  //   }
  //   return coffee;
  // }

  async findOne(id: string) {
    /**
     * 在数据中查找的find方法有四种：
     * 1.findOne(select: ["id"]) ??
     * 2.findIds([id])
     * 3.findOneBy({ id: id })
     * 4.findOneById(id)
     * 5.findBy({ id: id })
     */
    const coffee = await this.coffeeRepository.findOneBy({ id: +id });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  // create(createCoffeeDto: CreateCoffeeDto) {
  //   this.coffees.push({
  //     ...createCoffeeDto,
  //     id: this.coffees[this.coffees.length - 1]["id"] + 1,
  //   });
  //   return this.coffees[this.coffees.length - 1];
  // }
  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    /**
     * preload: 在数据库中查看这个id的实体是否已存在:
     *  如果存在，则取到原实体，并将传入的参数 updateCoffeeDto 的所有属性 merge 到实体中，将这个实体作为 preload 的返回值返回
     *  如果不存在，preload 函数将返回 undefined.
     */
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);
    // 将修改后的实体存入数据库中 <按照主键(这里是id)存>
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
