import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { BankAccountsController } from './bank_accounts.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BankAccountsController],
  providers: [BankAccountsService],
})
export class BankAccountsModule {}
