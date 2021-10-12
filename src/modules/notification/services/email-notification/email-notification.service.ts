import { Injectable } from '@nestjs/common';
import { Mail } from '../../../lib/mail/mail';

@Injectable()
export class EmailNotificationService {
    constructor(private readonly mailer: Mail,){}

    public async execute(payload : { recipients: string[], subject: string, template?: string, from?: string, body?: string}) {
        await this.mailer.setProvider("consoler");
        await this.mailer.send(payload)
    }
}
