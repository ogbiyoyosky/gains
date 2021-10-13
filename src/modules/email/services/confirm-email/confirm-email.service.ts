import { CACHE_MANAGER, ForbiddenException, Inject, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user/user.service';
import { validateEmailForGmail } from '../../../../shared/utils/email.utils';
import { EmailService } from '../email/email.service';

@Injectable()
export class ConfirmEmailService {
    constructor( @Inject(CACHE_MANAGER) private cache, private readonly emailService: EmailService, private readonly logger: Logger , private readonly userService: UserService){}
    public async execute({ token }) {
        const email = await this.getTokenFromCache(token);

        if(!email) {
            throw new ForbiddenException("Invalid verification token")
        }
        const emailEntity = await this.emailService.findByEmail(email);

        await this.emailService.update(emailEntity, {isVerified: true});
        await this.deleteTokenFromCache(token);

       const isGmail = validateEmailForGmail( email );

       const user = await this.userService.findByUserId(emailEntity.user.id)

       if(isGmail) {
           await this.userService.update(user, {verifiedCount : user.verifiedCount + 1})
       }
    }

    private async getTokenFromCache(token) {
        try {
            return await this.cache.get(`emails:${token}`);
        } catch (error) {
            this.logger.error({error}, error.message)
            throw new ServiceUnavailableException("Unable to verify email at the moment")
            
        }
        
    }

   

    private async deleteTokenFromCache(token) {
        try {
            return await this.cache.del(`emails:${token}`);
        } catch (error) {
            this.logger.error({error}, error.message)
        }
        
    }
}
