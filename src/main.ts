import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { WrapResponseInterceptor } from "./common/interceptors/wrap-response.interceptor";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      /**
       * stop a request from being processed
       * if any non-white listed properties are present.
       * throwing an error instead
       */
      forbidNonWhitelisted: true,
      // 将传参自动转换为controller方法中被定义的类型
      transform: true,
      transformOptions: {
        // 在 Dto 中的装饰器不再需要用 Type 指明类型
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor());

  const options = new DocumentBuilder()
    .setTitle("Iluvcoffee")
    .setDescription("Coffee application")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  /**
   * @param path: 挂载 Swagger UI 的路由路径
   * @param app: application instance
   * @param document: 文档对象
   */
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
