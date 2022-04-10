import { DynamicModule } from "@nestjs/common";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
export declare class DatabaseModule {
    static register(options: ConnectionOptions): DynamicModule;
}
