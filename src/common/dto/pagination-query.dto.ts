// import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  /**
   * 在 main.ts 中添加了校验规则
   * transformOptions: {
   *  enableImplicitConversion: true,
   * }
   * 在这里的装饰器不再需要用 Type 指明类型 Number
   */
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
