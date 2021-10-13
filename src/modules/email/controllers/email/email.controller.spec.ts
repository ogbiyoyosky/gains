import { Test, TestingModule } from '@nestjs/testing';
import { EmailModule } from '../../email.module';
import { EmailController } from './email.controller';

describe('EmailController', () => {
  let controller: EmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EmailModule],
      controllers: [EmailController],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
