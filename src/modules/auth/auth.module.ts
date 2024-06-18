import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BankAccountsModule } from '../bank_accounts/bank_accounts.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwt_secret } from 'src/common/constants/auth.constants';

@Module({
  imports: [BankAccountsModule,
    JwtModule.register({
      global: true,
      secret: jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
