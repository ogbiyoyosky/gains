import { BadRequestException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import ExceptionsFilter from './shared/filters/exceptions.filter';
import ValidationPipe from './shared/pipes/validation.pipe';
import { AuthGuard } from './shared/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.HOST'),
        port: configService.get('database.PORT'),
        username: configService.get('database.USERNAME'),
        password: configService.get('database.PASSWORD'),
        database: configService.get('database.NAME'),
        entities: configService.get('database.ENTITIES'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: ExceptionsFilter,
  },
  {
    provide: APP_PIPE,
    useFactory: () => {
      return new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors),
        transform: true,
        validationError: { target: false, value: false },
        whitelist: true,
      });
    },
  },
  AuthGuard
],
})
export class AppModule {}
