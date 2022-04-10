import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // TODO: 计算耗时
    console.time("Request-response time");
    console.log("Hi from middleware!");

    res.on("finish", () => console.timeEnd("Request-response time"));
    next();
  }
}
