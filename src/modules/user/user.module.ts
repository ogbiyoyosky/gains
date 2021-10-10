import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { CreateUserService } from './services/create-user/create-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AddEmailController } from './controllers/user/add-email/add-email.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),],
  controllers: [UserController, AddEmailController],
  providers: [UserService, CreateUserService]
})
export class UserModule {}
