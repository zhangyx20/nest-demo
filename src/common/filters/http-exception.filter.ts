import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

// @Catch() 将所需的原数据绑定到 ExceptionFilter
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // ctx.getResponse 返回底层平台的响应，默认为 Express.js
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === "string" ? { message: exceptionResponse } : (exceptionResponse as Object);

    console.log(error);
    response.status(status).json({
      ...error,
      timestamp: new Date().toString(),
    });
  }
}
