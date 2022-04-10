"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRatingModule = void 0;
const common_1 = require("@nestjs/common");
const coffee_rating_service_1 = require("./coffee-rating.service");
const coffees_module_1 = require("../coffees/coffees.module");
const database_module_1 = require("../database/database.module");
let CoffeeRatingModule = class CoffeeRatingModule {
};
CoffeeRatingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule.register({
                type: "postgres",
                host: "localhost",
                username: "postgres",
                password: "pass123",
                port: 5432,
            }),
            coffees_module_1.CoffeesModule,
        ],
        providers: [coffee_rating_service_1.CoffeeRatingService],
    })
], CoffeeRatingModule);
exports.CoffeeRatingModule = CoffeeRatingModule;
//# sourceMappingURL=coffee-rating.module.js.map