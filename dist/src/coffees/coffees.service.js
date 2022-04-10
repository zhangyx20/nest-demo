"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coffees_entities_1 = require("./entities/coffees.entities");
let CoffeesService = class CoffeesService {
    constructor(coffeeModel) {
        this.coffeeModel = coffeeModel;
    }
    findAll() {
        return this.coffeeModel.find().exec();
    }
    async findOne(id) {
        const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    create(createCoffeeDto) {
        const coffee = new this.coffeeModel(createCoffeeDto);
        return coffee.save();
    }
    async update(id, updateCoffeeDto) {
        const existingCoffee = await this.coffeeModel.findOneAndUpdate({ _id: id }, {
            set: updateCoffeeDto
        }, {
            new: true
        }).exec();
        if (!existingCoffee) {
            throw new common_1.NotFoundException(`Coffee #{id} not found`);
        }
        return existingCoffee;
    }
};
CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coffees_entities_1.Coffee.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map