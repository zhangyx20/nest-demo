import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffees.entities";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    // throw new Error('some error');
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);
    const coffee = await new this.coffeeModel(createCoffeeDto);
    console.log(coffee);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel.findOneAndUpdate({ _id: id }, {
      $set: updateCoffeeDto
    },{
      new: true // 返回最新的，不加的话会返回更新前的 coffee
    }).exec();
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #{id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }

  clear() {
    return this.coffeeModel.remove();
  }
}
