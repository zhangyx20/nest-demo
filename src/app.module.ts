import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
// import * as Joi from "@hapi/joi";
import appConfig from "./config/app.config";
// import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    /**
     * 将从默认位置(即根目录下的.env文件)加载、解析 .env 文件
     * 并且将 .env 中的健值分配给 process.env，将结果存储在私有结构中，可以通过 ConfigService 类进行访问
     */
    // ConfigModule.forRoot({
    //   // envFilePath: ".environment", // 自定义读取 env 文件位置
    //   // ignoreEnvFile: true, // 禁止加载 env 文件
    // }),
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   }),
    // }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    // MongooseModule.forRoot("mongoose://mongodb:27017/nest-course"),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      // host: "localhost",
      // port: "5432",
      // username: "postgres",
      // password: "pass123",
      // database: "postgres",
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
