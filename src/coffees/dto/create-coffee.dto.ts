import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCoffeeDto {
  // ApiProperty 装饰器：设置默认值、描述信息等属性值，以便 Swagger 显示
  @ApiProperty({ description: "The name of a coffee" })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "The brand of a coffee" })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
