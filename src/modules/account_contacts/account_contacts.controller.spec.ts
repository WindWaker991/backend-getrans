import { Test, TestingModule } from '@nestjs/testing';
import { AccountContactsController } from './account_contacts.controller';
import { AccountContactsService } from './account_contacts.service';

describe('AccountContactsController', () => {
  let controller: AccountContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountContactsController],
      providers: [AccountContactsService],
    }).compile();

    controller = module.get<AccountContactsController>(AccountContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
