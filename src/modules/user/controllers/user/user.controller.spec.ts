import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../../services/create-user/create-user.service';
import { UserService } from '../../services/user/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, CreateUserService],
      exports: [UserService,CreateUserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
