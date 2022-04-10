import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator((defaultVal: string, ctx: ExecutionContext) => {
  console.log(defaultVal);
  const request = ctx.switchToHttp().getRequest();
  return request.protocol; // http
});
