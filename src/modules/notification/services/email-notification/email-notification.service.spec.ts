import { Test, TestingModule } from '@nestjs/testing';
import Mail from 'nodemailer/lib/mailer';
import { EmailNotificationService } from './email-notification.service';

describe('EmailNotificationService', () => {
  let service: EmailNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mail],
    }).compile();

    service = module.get<EmailNotificationService>(EmailNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
