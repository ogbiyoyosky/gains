import { BadRequestException, CACHE_MANAGER, ForbiddenException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../../../auth/dto/login.dto';
import { User } from '../../../../user/entities/user.entity';
import { UserService } from '../../../../user/services/user/user.service';
import ObjectLiteral from '../../../../../shared/interfaces/object-literal.interface';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserFactory } from '../../../../user/factories/user.factor';
import { generateString } from '../../../../user/utils/string.utils';

import { EmailService } from 'src/modules/email/services/email/email.service';
import { EmailNotificationService } from 'src/modules/notification/services/email-notification/email-notification.service';


@Injectable()
export class LoginService {
    constructor(private readonly userService: UserService, @Inject(CACHE_MANAGER) private cache, private readonly config: ConfigService, private readonly emailService: EmailService, private readonly emailNotificationService:  EmailNotificationService, private readonly logger: Logger ){}
    private ttlInSecs = 60 * 5; 
    public async execute(data: LoginDto) : Promise<{message: string, jwtData?: ObjectLiteral | null }>{

        const authType = this.validateLoginInput(data)

        if (authType === "passwordAuth" ) {
            const token = await this.processPasswordAuthentication(data);

            return {
                message: "Successfully loggedIn",
                jwtData: {
                    token
                }
            }
        } else {
    
            await this.processEmailAuthentication( data )

            return {
                message: "Please check your email for a link it expires in 5 munites"
            }
        }
    }

    private validateLoginInput(data: LoginDto): string {
        if(data.userName  && data.password) {
            return "passwordAuth"
        } else if (data.email) {
            return "emailAuth"
        } else {
            throw new BadRequestException("Please Provide email or userName and Password")
        }
    }

    private async processPasswordAuthentication({ userName, password }: LoginDto) {
        const user = await this.userService.findByUserName(userName);
        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isValidPassword = await user.comparePassword(password);

        if(!isValidPassword) throw new UnauthorizedException("Invalid credentials");

        return this.generateJwtToken(user);

    }

    public async generateJwtToken(user: User): Promise<string> {
    const userJwtAttributePayload = UserFactory.generateUserForJwt(user);

        return jwt.sign(
            userJwtAttributePayload,
            this.config.get('jwt.JWT_AUTH_SECRET'),
            { expiresIn: this.config.get('jwt.EXPIRES_IN') }
          );
    }


    private async processEmailAuthentication({ email }: LoginDto) {
        
        const emailExist = await this.emailService.findByEmail(email);

        if(!emailExist) throw new NotFoundException("Account do not exist");

        if(!emailExist.isVerified) {
            throw new ForbiddenException("Please confirm you to login");
        }

        const token = await this.generateToken(email);
        this.emailNotificationService.execute({
            recipients: [email],
            subject: "Login link",
            body: `Please click the link below to login
              ${process.env.BASE_URL}/api/login/tokens/${token}
            `
        })
    }


    private async generateToken(email) {
        return  await this.saveToCache(generateString(20), email);
    }

    private async saveToCache(token, email) {
        try {
            await this.cache.set(`login:${token}`, email, { ttl: this.ttlInSecs });
            return token
        } catch(error) {
            this.logger.error({error }, error.message)
        }
    }

}
