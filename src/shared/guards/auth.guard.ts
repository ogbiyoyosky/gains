import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { UserFactory } from "../../modules/user/factories/user.factor";

export class AuthGuard implements CanActivate {
    constructor(){}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authToken = this.getAuthTokenFromRequest(request)
        const valid = await this.validateRequest(request);
        if(!valid) throw new UnauthorizedException("Unauthorized");

        return true;
    }

    private async validateRequest(request: Request) : Promise<boolean> {
        const authToken = this.getAuthTokenFromRequest(request);

        if(!authToken) return false 

        const authData: any = jwt.decode(authToken, { complete: true });
        if (!authData || !authData.payload) return false;

        request.user = UserFactory.generateUserForJwt(authData.payload);

        return true;

    }

    getAuthTokenFromRequest(request: Request): string {
        const authTokenSegment = (request.headers['authorization'] || '').split(' ')
        
        return authTokenSegment.length == 2 ? authTokenSegment[1] : null;
    }
}