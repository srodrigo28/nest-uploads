import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction ) {
        
        console.log("[MIDDLEWARE] Passando...")

        const authorization = req.headers.authorization

        if(authorization){
            console.log("Token: ", authorization )

            if( authorization === '123456'){
                console.log("TOKEN VALIDADO!" )
                return next();
            }
            res.status(401).json( {message: "Token invalido"} )
        }
        next()
    }
}