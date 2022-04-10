import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from "./entities/flavor.entity";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { Event } from "../events/entities/event.entity";
import { ConfigService } from "@nestjs/config";

// import { COFFEE_BRANDS } from "./coffees.constants";

// @Injectable({ scope: Scope.REQUEST })
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    private readonly configService: ConfigService, // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
  ) {
    // const databaseHost = this.configService.get("database.host", "localhost");
    const coffeesConfig = this.configService.get("coffees");
    console.log(coffeesConfig);
    // console.log(databaseHost);
    // console.log(coffeeBrands);
    // console.log("CoffeesService instantiated...");
  }

  // findAll() {
  //   // return this.coffeeRepository.find();
  //   return this.coffeeRepository.find({
  //     relations: ["flavors"],
  //   });
  // }
  findAll(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.coffeeRepository.find({
      relations: ["flavors"],
      // 跳过多少跳
      skip: offset,
      // 总共返回几条
      take: limit,
    });
  }

  // async findOne(id: string) {
  //   /**
  //    * 在数据中查找的find方法有四种：
  //    * 1.findOne({ where: { id: +id } })
  //    * 2.findIds([+id])
  //    * 3.findOneBy({ id: +id })
  //    * 4.findOneById(+id)
  //    * 5.findBy({ id: +id })
  //    */
  //   const coffee = await this.coffeeRepository.findOneBy({ id: +id });
  //   if (!coffee) {
  //     throw new NotFoundException(`Coffee #${id} not found`);
  //   }
  //   return coffee;
  // }
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ["flavors"],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  // create(createCoffeeDto: CreateCoffeeDto) {
  //   const coffee = this.coffeeRepository.create(createCoffeeDto);
  //   return this.coffeeRepository.save(coffee);
  // }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))));
    /**
     * preload: 在数据库中查看这个id的实体是否已存在:
     *  如果存在，则取到原实体，并将传入的参数 updateCoffeeDto 的所有属性 merge 到实体中，将这个实体作为 preload 的返回值返回
     *  如果不存在，preload 函数将返回 undefined.
     */
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) throw new NotFoundException(`Coffee #${id} not found`);
    // 将修改后的实体存入数据库中 <按照主键(这里是id)存>
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(+id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    return existingFlavor || this.flavorRepository.create({ name });
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = "recommend_coffee";
      recommendEvent.type = "coffee";
      recommendEvent.payload = { coffeeId: coffee.id };

      // 使用 queryRunner 的实体管理器来保存咖啡和事件实体
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      // 如果出现错误，回滚整个事务，防止数据库中的不一致
      await queryRunner.rollbackTransaction();
    } finally {
      // 释放 queryRunner
      await queryRunner.release();
    }
  }
}
