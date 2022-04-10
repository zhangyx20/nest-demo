import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
  // Query,
  // Res,
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Public } from "src/common/decorators/public.decorators";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { Protocol } from "../common/decorators/protocol.decorator";
import { ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";

/**
 * 在 Swagger 中给 coffees 模块的所有路由加上 "coffees" 的标签
 * 也可以在 method-level 层面给单个路由加上标签
 */
@ApiTags("coffees")
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {
    console.log("CoffeesController created!");
  }

  @Post("create")
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // console.log(createCoffeeDto instanceof CreateCoffeeDto);  //false
    return this.coffeesService.create(createCoffeeDto);
  }

  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }
  // @Get()
  // findAll() {
  //   return this.coffeesService.findAll();
  // }
  @ApiForbiddenResponse({ description: "Forbidden" })
  @Public()
  @Get()
  // 传给 Protocol 装饰器第一个参数："https"
  async findAll(@Protocol("https") protocol: string, @Query() paginationQuery: PaginationQueryDto) {
    console.log(protocol);
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    return this.coffeesService.findAll(paginationQuery);
  }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return `This action returns #${params.id} coffee`;
  // }
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  // @Post()
  // // create(@Body() body) {
  // //   return body;
  // // }
  // @HttpCode(HttpStatus.GONE)
  // create(@Body('name') name: string) {
  //   return name;
  // }

  @Patch(":id")
  update(@Param("id") id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action update #${id} ${body.Brand} coffee`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete("remove/:id")
  remove(@Param("id") id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
