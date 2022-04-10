import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
/**
 * NestInterceptor 接口：实现 intercept 方法
 * intercept 方法从 RxJS 库里返回一个 Observale
 */
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return next.handle().pipe(tap((data) => console.log("After...", data)));
    return next.handle().pipe(map((data) => ({ data })));
  }
}
