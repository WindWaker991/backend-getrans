import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BankAccountsService {
  constructor(private prisma: PrismaService) {}

  private async hashPassword(password: string) {
    const saltrounds = 10;
    return await bcrypt.hash(password, saltrounds);
  }

  async findByEmail(email: string) {
    return await this.prisma.bank_accounts.findUnique({
      where: { email: email },
      include: { contacts: true },
    });
  }

  async findByRut(rut: string) {
    return await this.prisma.bank_accounts.findUnique({
      where: { rut: rut },
    });
  }

  async findByName(firstName: string, lastName: string) {
    return await this.prisma.bank_accounts.findMany({
      where: {
        firstName: firstName,
        lastName: lastName,
      },
    });
  }

  async create(createBankAccountDto: CreateBankAccountDto) {
    const { firstName, lastName, email, password, rut } = createBankAccountDto;
    const user = await this.prisma.bank_accounts.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    try {
      rut;
      return await this.prisma.bank_accounts.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: await this.hashPassword(password),
          rut: rut,
          contacts: { create: {} },
        },
      });
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.bank_accounts.findMany();
    } catch (error) {
      throw new HttpException('Error fetching users', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(accountId: string) {
    try {
      return await this.prisma.bank_accounts.findUnique({
        where: { id: accountId },
      });
    } catch (error) {
      throw new HttpException('Error fetching user', HttpStatus.BAD_REQUEST);
    }
  }

  async update(accountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    try {
      return await this.prisma.bank_accounts.update({
        where: { id: accountId },
        data: updateBankAccountDto,
      });
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(accountId: string) {
    try {
      return await this.prisma.bank_accounts.delete({
        where: { id: accountId },
      });
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.BAD_REQUEST);
    }
  }
}
