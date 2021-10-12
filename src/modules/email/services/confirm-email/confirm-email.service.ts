import { CACHE_MANAGER, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class ConfirmEmailService {
    constructor( @Inject(CACHE_MANAGER) private cache, private readonly emailService: EmailService, ){}
    public async execute({ token }) {
        const email = await this.getTokenFromCache(token);

        if(!email) {
            throw new ForbiddenException("Invalid verification token")
        }
        const emailEntity = await this.emailService.findByEmail(email);

        await this.emailService.update(emailEntity, {isVerified: true});

        await this.deleteTokenFromCache(token)
    }

    private async getTokenFromCache(token) {
        try {
            return await this.cache.get(`emails:${token}`);
        } catch (error) {
            console.log(error)
        }
        
    }

    private async deleteTokenFromCache(token) {
        try {
            return await this.cache.del(`emails:${token}`);
        } catch (error) {
            console.log(error)
        }
        
    }
}
