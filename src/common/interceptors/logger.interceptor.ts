import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): 
    Observable<any> | Promise<Observable<any>> {
        console.log("INTERCEPTANDO ESSA REQUISICÃO")

        const request = context.switchToHttp().getRequest();
        const method = request.url;
        const url = request.url;
        const now = Date.now();
        
        console.log(`[REQUEST] ${method} ${url} - Inicio da request` )
        return next.handle().pipe(
            tap( () => {
                console.log(`[RESPONSE] ${method} ${url} - Inicio da response: ${Date.now() - now}ms` )
            })
        )
    }
}