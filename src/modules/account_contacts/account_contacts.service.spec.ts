import { Test, TestingModule } from '@nestjs/testing';
import { AccountContactsService } from './account_contacts.service';

describe('AccountContactsService', () => {
  let service: AccountContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountContactsService],
    }).compile();

    service = module.get<AccountContactsService>(AccountContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
