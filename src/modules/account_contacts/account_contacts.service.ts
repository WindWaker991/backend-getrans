import { Injectable } from '@nestjs/common';
import { CreateAccountContactDto } from './dto/create-account_contact.dto';
import { UpdateAccountContactDto } from './dto/update-account_contact.dto';

@Injectable()
export class AccountContactsService {
  create(createAccountContactDto: CreateAccountContactDto) {
    return 'This action adds a new accountContact';
  }

  findAll() {
    return `This action returns all accountContacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountContact`;
  }

  update(id: number, updateAccountContactDto: UpdateAccountContactDto) {
    return `This action updates a #${id} accountContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountContact`;
  }
}
