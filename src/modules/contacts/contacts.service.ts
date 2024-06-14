import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Contact } from 'src/interfaces/contact.interface';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService){}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const response = await this.prisma.contact.create({
      data: {
        id: createContactDto.id,
        bankAccount: {
          connect: { id: createContactDto.bankAccount.id }
        }
      },
      include: { bankAccount: true }
    });
    if (!response.bankAccount){
      console.log("No se ha podido crear el contacto");
      return;
    }
    return response;
  }

  async findAll(): Promise<Contact[]> {
    return await this.prisma.contact.findMany({
      include: { bankAccount: true }
    });
  }

  async findOne(id: number): Promise<Contact> {
    return await this.prisma.contact.findUnique({
      where: { id: id },
      include: { bankAccount: true }
    });
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    return await this.prisma.contact.update({
      where: { id: id },
      data: {
        id: updateContactDto.id,
        bankAccount: {
          connect: { id: updateContactDto.bankAccount.id }
        }
      },
      include: { bankAccount: true }
    });
  }

  async remove(id: number): Promise<Contact> {
    const contact = this.findOne(id);
    if (!contact){
      console.log("No se ha podido encontrar el contacto");
      return;
    }
    await this.prisma.contact.delete({
      where: { id: id },
      include: { bankAccount : true }
    });

    /** // No estoy seguro si este código sea necesario, por la cuenta del banco.
    await this.prisma.bankAccount.delete({
      where: { id: (await contact).bankAccount.id }
    });
    */
    return contact;
  }
}
