import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { EmailService } from './services/email/email.service';
import { AddEmailController } from './controllers/add-email/add-email.controller';
import { AddEmailService } from './services/add-email/add-email.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailNotificationService } from '../notification/services/email-notification/email-notification.service';
import { Mail } from '../lib/mail/mail';
import { ConfirmEmailService } from './services/confirm-email/confirm-email.service';
import { ConfirmEmailController } from './controllers/confirm-email/confirm-email.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Email]),CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      store: redisStore,
      host: configService.get<string>('redis.HOST'),
      port: configService.get<number>('redis.PORT'),
      auth_pass: configService.get<string>('redis.KEY'),
    }),
    inject: [ConfigService],
  }),],
  providers: [EmailService, AddEmailService, EmailNotificationService, Mail, ConfirmEmailService],
  controllers: [AddEmailController, ConfirmEmailController]
})
export class EmailModule {}
