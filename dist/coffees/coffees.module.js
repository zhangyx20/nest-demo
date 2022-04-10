"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesModule = exports.CoffeeBrandsFactory = void 0;
const coffees_service_1 = require("./coffees.service");
const coffees_controller_1 = require("./coffees.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity");
const event_entity_1 = require("../events/entities/event.entity");
const coffees_constants_1 = require("./coffees.constants");
const config_1 = require("@nestjs/config");
const coffees_config_1 = require("./config/coffees.config");
class ConfigService {
}
class DevelopmentConfigService {
}
class ProductionConfigService {
}
let CoffeeBrandsFactory = class CoffeeBrandsFactory {
    create() {
        return ["buddy brew", "nescafe"];
    }
};
CoffeeBrandsFactory = __decorate([
    (0, common_1.Injectable)()
], CoffeeBrandsFactory);
exports.CoffeeBrandsFactory = CoffeeBrandsFactory;
let CoffeesModule = class CoffeesModule {
};
CoffeesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([coffee_entity_1.Coffee, flavor_entity_1.Flavor, event_entity_1.Event]),
            config_1.ConfigModule.forFeature(coffees_config_1.default),
        ],
        controllers: [coffees_controller_1.CoffeesController],
        providers: [
            coffees_service_1.CoffeesService,
            CoffeeBrandsFactory,
            {
                provide: ConfigService,
                useClass: process.env.NODE_ENV === "" ? DevelopmentConfigService : ProductionConfigService,
            },
            {
                provide: coffees_constants_1.COFFEE_BRANDS,
                useFactory: (brandFactory) => brandFactory.create(),
                inject: [CoffeeBrandsFactory],
            },
        ],
        exports: [coffees_service_1.CoffeesService],
    })
], CoffeesModule);
exports.CoffeesModule = CoffeesModule;
//# sourceMappingURL=coffees.module.js.map