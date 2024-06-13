import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountContactsService } from './account_contacts.service';
import { CreateAccountContactDto } from './dto/create-account_contact.dto';
import { UpdateAccountContactDto } from './dto/update-account_contact.dto';

@Controller('account-contacts')
export class AccountContactsController {
  constructor(private readonly accountContactsService: AccountContactsService) {}

  @Post()
  create(@Body() createAccountContactDto: CreateAccountContactDto) {
    return this.accountContactsService.create(createAccountContactDto);
  }

  @Get()
  findAll() {
    return this.accountContactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountContactsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountContactDto: UpdateAccountContactDto) {
    return this.accountContactsService.update(+id, updateAccountContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountContactsService.remove(+id);
  }
}
