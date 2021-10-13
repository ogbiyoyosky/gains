import { Test, TestingModule } from '@nestjs/testing';
import { RemoveEmailService } from './remove-email.service';

describe('RemoveEmailService', () => {
  let service: RemoveEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveEmailService],
    }).compile();

    service = module.get<RemoveEmailService>(RemoveEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
