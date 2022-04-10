import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "./guards/api-key.guard";
import { ConfigModule } from "@nestjs/config";
import { LoggingMiddleware } from "./middleware/logging.middleware";

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 对所有的路由都使用
    consumer.apply(LoggingMiddleware).forRoutes("*");
    // 只对 coffees 模块，GET 方法的请求使用
    // consumer.apply(LoggingMiddleware).forRoutes({ path: "coffees", method: RequestMethod.GET });
  }
}
