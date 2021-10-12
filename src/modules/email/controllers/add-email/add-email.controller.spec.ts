import { Test, TestingModule } from '@nestjs/testing';
import { AddEmailController } from './add-email.controller';

describe('AddEmailController', () => {
  let controller: AddEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddEmailController],
    }).compile();

    controller = module.get<AddEmailController>(AddEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
