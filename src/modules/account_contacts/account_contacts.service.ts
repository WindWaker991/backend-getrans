import { Injectable } from '@nestjs/common';
import { CreateAccountContactDto } from './dto/create-account_contact.dto';
import { UpdateAccountContactDto } from './dto/update-account_contact.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountContactDto: CreateAccountContactDto) {
    return await this.prisma.account_contacts.create({
      data: {
        contacts: {
          connect: {
            id: createAccountContactDto.contact_id,
          },
        },

        bank_accounts: {
          connect: {
            id: createAccountContactDto.account_id,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.account_contacts.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.account_contacts.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateAccountContactDto: UpdateAccountContactDto) {
    return `This action updates a #${id} accountContact`;
  }

  async remove(id: string) {
    return await this.prisma.account_contacts.delete({
      where: {
        id: id,
      },
    });
  }
}
