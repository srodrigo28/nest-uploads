import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthAdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        console.log("----------------------------------------------------")
        console.log(request['user'])
        console.log("----------------------------------------------------")
        
        if(request['user']?.role === 'admin') return true;

        console.log(" ################# PASSOU PELO AUTH GUARD")
        return false
    }
}