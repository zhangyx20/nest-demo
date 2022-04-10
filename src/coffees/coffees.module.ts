import { CoffeesService } from "./coffees.service";
import { CoffeesController } from "./coffees.controller";
import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffees.constants";
import { ConfigModule } from "@nestjs/config";
import coffeesConfig from "./config/coffees.config";

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ["buddy brew", "nescafe"];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === "" ? DevelopmentConfigService : ProductionConfigService,
    },
    // { provide: COFFEE_BRANDS, useValue: ["buddy brew", "nescafe"] },
    // { provide: COFFEE_BRANDS, useFactory: () => ["buddy brew", "nescafe"] },
    {
      provide: COFFEE_BRANDS,
      // 参数 brandFactory 是由 inject 注册提供的
      useFactory: (brandFactory: CoffeeBrandsFactory) => brandFactory.create(),
      // useFactory: async () => {
      //   // const coffeeBrands = Promise.resolve(["buddy"]);
      //   const coffeeBrands = new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(["buddy brew"]);
      //     }, 3000);
      //   });
      //   console.log("Asynchronous data is retrieved...");
      //   return coffeeBrands;
      // },
      // inject 接受一个 provider 数组，这些 provider 会被传递到 useFactory 函数中
      inject: [CoffeeBrandsFactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
