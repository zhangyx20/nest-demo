import { CoffeesService } from "./coffees.service";
import { CoffeesController } from "./coffees.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Coffee, CoffeeSchema } from "./entities/coffees.entities";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name, // name of the model, 获取函数的名称 -> 'coffee'
        schema: CoffeeSchema,
      },
    ]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
