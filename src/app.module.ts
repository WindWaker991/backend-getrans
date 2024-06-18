import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BankAccountsModule } from './modules/bank_accounts/bank_accounts.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AccountContactsModule } from './modules/account_contacts/account_contacts.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    BankAccountsModule,
    ContactsModule,
    AccountContactsModule,
    TransfersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
