import { Module } from '@nestjs/common';
import { AccountContactsService } from './account_contacts.service';
import { AccountContactsController } from './account_contacts.controller';

@Module({
  controllers: [AccountContactsController],
  providers: [AccountContactsService],
})
export class AccountContactsModule {}
