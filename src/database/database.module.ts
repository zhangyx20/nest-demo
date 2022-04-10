import { DynamicModule, Module } from "@nestjs/common";
import { createConnection } from "typeorm";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

@Module({
  // providers: [
  //   {
  //     provide: "CONNECTION",
  //     useValue: createConnection({
  //       type: "postgres",
  //       host: "localhost",
  //       port: 5432,
  //     }),
  //   },
  // ],
})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: "CONNECTION",
          useValue: createConnection(options),
        },
      ],
    };
  }
}
