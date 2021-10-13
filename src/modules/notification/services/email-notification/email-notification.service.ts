import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mail } from '../../../lib/mail/mail';

@Injectable()
export class EmailNotificationService {
    constructor(private readonly mailer: Mail,private readonly config: ConfigService, ){}

    public async execute(payload : { recipients: string[], subject: string, template?: string, from?: string, body?: string}) {
        await this.mailer.setProvider(this.config.get('mailSender.active'));
        await this.mailer.send(payload)
    }
}
