import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsService } from '../bank_accounts/bank_accounts.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { CreateBankAccountDto } from '../bank_accounts/dto/create-bank_account.dto';
import { ValidatePassDto } from './dto/validate-pass.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly bankAccountsService: BankAccountsService,
    private jwtService: JwtService
  ) { }

  async login(loginPayloadDto: LoginPayloadDto): Promise<any> {
    const userFound = await this.bankAccountsService.findByEmail(loginPayloadDto.email)

    const passwordMatch = await bcrypt.compare(loginPayloadDto.password, userFound.password)
    if (!passwordMatch) throw new BadRequestException('Invalid credentials')
    if (!userFound) throw new NotFoundException('User not found')

    const payload = { email: userFound.email, sub: userFound.id }
    const access_token = await this.jwtService.signAsync(payload)
    return {
      user: userFound,
      access_token: access_token
    }
  }

  async register(createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountsService.create(createBankAccountDto)
  }

  async validateMePass(validate_me_pass: ValidatePassDto) {
    return await null
  }

  async getProfile() {
    return "Pong!"
  }

}
