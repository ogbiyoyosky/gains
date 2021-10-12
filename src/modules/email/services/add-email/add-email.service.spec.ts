import { Test, TestingModule } from '@nestjs/testing';
import { AddEmailService } from './add-email.service';

describe('AddEmailService', () => {
  let service: AddEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddEmailService],
    }).compile();

    service = module.get<AddEmailService>(AddEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
