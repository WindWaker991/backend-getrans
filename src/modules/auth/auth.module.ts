import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BankAccountsModule } from '../bank_accounts/bank_accounts.module';

@Module({
  imports: [BankAccountsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
