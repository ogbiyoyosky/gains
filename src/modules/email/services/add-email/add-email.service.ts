import { CACHE_MANAGER, ConflictException, Inject, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { EmailNotificationService } from '../../../../modules/notification/services/email-notification/email-notification.service';
import { User } from '../../../../modules/user/entities/user.entity';
import { AddEmailDto } from '../../dto/add-email.dto';
import { EmailFactory } from '../../factories/email.factory';
import { EmailService } from '../email/email.service';
import { generateString } from '../../../user/utils/string.utils';

@Injectable()
export class AddEmailService {
    constructor(private readonly emailService: EmailService,@Inject(CACHE_MANAGER) private cache, private readonly emailNotificationService: EmailNotificationService) {}
    private ttlInSecs = 60 * 60 * 24;
    async execute({ email }: AddEmailDto, user: User) {

        if(await this.isExistingEmail(email)) {
            throw new ConflictException("Email already in use")
        }
        const emailAttribute = EmailFactory.createNew({
            email,
            user
        })

        await this.emailService.save(emailAttribute);

        const token = generateString(20);

        await this.saveToCache(token, email);


        this.emailNotificationService.execute({
            recipients: [email],
            subject: "Confirm Email",
            body: `Please click the link below to confirm your email
              http://localhost:3000/api/emails/confirm/${token}
            `
        })

    }

    private async saveToCache(token, email) {
        try {
            await this.cache.set(`emails:${token}`, email, {ttl: this.ttlInSecs});
            return token
        } catch(error) {
            Logger.error({error}, error.message)
            throw new ServiceUnavailableException("Unable to add email at the moment")
        }
    }

    async isExistingEmail(email: string): Promise<boolean> {
        const isExist = await this.emailService.findByEmail(email);
        if(!isExist) return false;
        return true
    }
}
