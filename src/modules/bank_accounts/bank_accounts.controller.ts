import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  createBankAccount(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.create(createBankAccountDto);
  }

  @Get()
  findAllBankAccounts() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  findOneBankAccount(@Param('id') accountId: string) {
    return this.bankAccountsService.findOne(accountId);
  }

  @Patch(':id')
  updateBankAccount(
    @Param('id') accountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(accountId, updateBankAccountDto);
  }

  @Delete(':id')
  deleteBankAccount(@Param('id') accountId: string) {
    return this.bankAccountsService.remove(accountId);
  }
}
