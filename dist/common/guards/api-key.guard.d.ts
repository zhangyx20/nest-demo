import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
export declare class ApiKeyGuard implements CanActivate {
    private readonly reflector;
    private readonly configService;
    constructor(reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
