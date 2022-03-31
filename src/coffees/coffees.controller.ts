import { CreateCoffeeDto } from './dto/create-coffee.dto';
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
  // Query,
  // Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Post('create')
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // console.log(createCoffeeDto instanceof CreateCoffeeDto);  //false
    return this.coffeesService.create(createCoffeeDto);
  }

  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }
  // findAll(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  // }
  @Get('findAll')
  findAll() {
    return this.coffeesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return `This action returns #${params.id} coffee`;
  // }
  @Get(':id')
  findOne(@Param('id') id: string) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action update #${id} ${body.Brand} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
