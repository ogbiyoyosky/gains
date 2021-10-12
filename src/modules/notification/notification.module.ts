import { Module } from '@nestjs/common';
import { Mail } from '../lib/mail/mail';
import { EmailNotificationService } from './services/email-notification/email-notification.service';

@Module({
  providers: [EmailNotificationService, Mail],
})
export class NotificationModule {}
