import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

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
          enableImplicitConversion: true
        }
    })
  );
  await app.listen(3000);
}

bootstrap();
