import { CacheModule, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginController } from './controllers/auth/login/login.controller';
import { LoginService } from './services/auth/login/login.service';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from '../user/services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Mail } from '../lib/mail/mail';
import { EmailService } from '../email/services/email/email.service';
import { Email } from '../email/entities/email.entity';
import { EmailNotificationService } from '../notification/services/email-notification/email-notification.service';
import { TokenAuthService } from './services/token-auth/token-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email]),CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      store: redisStore,
      host: configService.get<string>('redis.HOST'),
      port: configService.get<number>('redis.PORT'),
      auth_pass: configService.get<string>('redis.KEY'),
    }),
    inject: [ConfigService],
  }),],
  controllers: [LoginController],
  providers: [LoginService, UserService, Mail, EmailService, EmailNotificationService, TokenAuthService, Logger]
})
export class AuthModule {}
