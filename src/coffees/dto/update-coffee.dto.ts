import { CreateCoffeeDto } from "./create-coffee.dto";
// import { PartialType } from "@nestjs/mapped-types";
// 改为从 @nestjs/swagger 中引入，能实现相同的功能，并且能够在 swagger 文档中正确的将可选的属性展示
import { PartialType } from "@nestjs/swagger";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
