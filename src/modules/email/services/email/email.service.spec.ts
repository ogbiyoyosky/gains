import { Test, TestingModule } from '@nestjs/testing';
import { EmailNotificationService } from '../../../../modules/notification/services/email-notification/email-notification.service';
import { Mail } from '../../../lib/mail/mail';
import { AddEmailService } from '../add-email/add-email.service';
import { ConfirmEmailService } from '../confirm-email/confirm-email.service';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, EmailService, AddEmailService, EmailNotificationService, Mail, ConfirmEmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
