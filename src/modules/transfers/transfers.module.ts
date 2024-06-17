import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { BankAccountsModule } from '../bank_accounts/bank_accounts.module';

@Module({
  imports: [PrismaModule, BankAccountsModule],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule { }
