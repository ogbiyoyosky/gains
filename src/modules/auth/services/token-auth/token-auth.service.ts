import { CACHE_MANAGER, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { EmailService } from 'src/modules/email/services/email/email.service';
import { UserService } from 'src/modules/user/services/user/user.service';
import ObjectLiteral from 'src/shared/interfaces/object-literal.interface';
import { LoginService } from '../auth/login/login.service';

@Injectable()
export class TokenAuthService {
    constructor(private readonly emailService: EmailService, private readonly userService: UserService, @Inject(CACHE_MANAGER) private cache, private readonly loginService: LoginService, private readonly logger: Logger ){}
    public async execute({ token }):  Promise<{message: string, jwtData?: ObjectLiteral | null }> {
        
        const email = await this.cache.get(`login:${token}`);

        if(!email) throw new UnauthorizedException("invalid token or expired token");

        const emailData = await this.emailService.findByEmail(email);

        if(!emailData) throw new UnauthorizedException("User account deactivated");

        const userData = await this.userService.findByUserId(emailData.user.id);

        const jwtToken = await this.loginService.generateJwtToken(userData)

        try {
            await this.cache.del(`login:${token}`); 
        } catch (error) {
            this.logger.error({error}, error.message)
        }
       
        return {
            message: "Successfully loggedIn",
            jwtData: {
                token: jwtToken
            }
        }


    }
 }
