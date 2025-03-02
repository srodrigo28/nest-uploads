import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getResponse<Request>()
        const status = exception.getStatus()
        const errorResponse = exception.getResponse()

        console.log("PASSANDO DENTRO DO FILTER .............................")

        response.status(status).json({
            statuCode: status,
            timestap: new Date().toISOString(),
            message: errorResponse !== "" ? errorResponse : "Erro no sistema chmar o suporte!",
            path: request.url
        })
    }
}