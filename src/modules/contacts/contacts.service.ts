import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    const response = await this.prisma.contacts.create({
      data: {
        id: createContactDto.id,
        bank_account: {
          connect: { id: createContactDto.bankAccount.id },
        },
      },
      include: { bank_account: true },
    });
    if (!response) {
      console.log('No se ha podido crear el contacto');
      return;
    }
    return response;
  }

  async findAll() {
    return await this.prisma.contacts.findMany({
      include: { bank_account: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.contacts.findUnique({
      where: { id: id },
      include: { bank_account: true },
    });
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.prisma.contacts.update({
      where: { id: id },
      data: {
        id: updateContactDto.id,
        bank_account: {
          connect: { id: updateContactDto.bankAccount.id },
        },
      },
      include: { bank_account: true },
    });
  }

  async remove(id: string) {
    const contact = this.prisma.contacts.findUnique({ where: { id: id } });
    if (!contact) {
      console.log('No se ha podido encontrar el contacto');
      return;
    }
    await this.prisma.contacts.delete({
      where: { id: id },
      include: { bank_account: true },
    });

    /** // No estoy seguro si este código sea necesario, por la cuenta del banco.
    await this.prisma.bankAccount.delete({
      where: { id: (await contact).bankAccount.id }
    });
    */
    return contact;
  }
}
