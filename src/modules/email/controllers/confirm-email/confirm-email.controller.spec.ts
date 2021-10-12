import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmEmailController } from './confirm-email.controller';

describe('ConfirmEmailController', () => {
  let controller: ConfirmEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmEmailController],
    }).compile();

    controller = module.get<ConfirmEmailController>(ConfirmEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
