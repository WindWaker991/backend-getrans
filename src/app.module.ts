import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BankAccountsModule } from './modules/bank_accounts/bank_accounts.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AccountContactsModule } from './modules/account_contacts/account_contacts.module';
import { TransfersModule } from './modules/transfers/transfers.module';

@Module({
  imports: [PrismaModule, BankAccountsModule, ContactsModule, AccountContactsModule, TransfersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
