/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from "mongoose";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { Coffee } from "./entities/coffees.entities";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
export declare class CoffeesService {
    private readonly coffeeModel;
    constructor(coffeeModel: Model<Coffee>);
    findAll(paginationQuery: PaginationQueryDto): Promise<(Coffee & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<Coffee & {
        _id: any;
    }>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee & {
        _id: any;
    }>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee & {
        _id: any;
    }>;
    remove(id: string): Promise<Coffee & {
        _id: any;
    }>;
    clear(): import("mongoose").Query<any, Coffee & {
        _id: any;
    }, {}, Coffee>;
}
