/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { CoffeesService } from "./coffees.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    create(createCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffees.entities").Coffee & {
        _id: any;
    }>;
    findAll(paginationQuery: PaginationQueryDto): Promise<(import("./entities/coffees.entities").Coffee & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<import("./entities/coffees.entities").Coffee & {
        _id: any;
    }>;
    update(id: string, body: any): string;
    remove(id: string): string;
    clear(): import("mongoose").Query<any, import("./entities/coffees.entities").Coffee & {
        _id: any;
    }, {}, import("./entities/coffees.entities").Coffee>;
}
