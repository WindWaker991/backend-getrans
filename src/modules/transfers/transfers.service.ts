import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { BankAccountsService } from '../bank_accounts/bank_accounts.service';

@Injectable()
export class TransfersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bankAccountsService: BankAccountsService
  ) { }

  create(createTransferDto: CreateTransferDto) {

    return this.prismaService.transfers.create({
      //TODO: revisar que el findOne funcione
      // accountBankOrigFound = this.bankAccountsService.findOne(createTransferDto.originId);
      // if(!accountBankOrigFound) throw new NotFoundException('Origin account not found');
      // accountBankDestFound = this.bankAccountsService.findOne(createTransferDto.originId);
      // if(!accountBankDestFound) throw new NotFoundException('Destination account not found');
      data: {
        amount: createTransferDto.amount,
        description: createTransferDto.description,
        date: createTransferDto.date,
        origin: {
          connect: {
            id: createTransferDto.originId
          }
        },
        destination: {
          connect: {
            id: createTransferDto.destinationId
          },
        }
      },
    });
  }

  findAll() {
    return this.prismaService.transfers.findMany({
      include: {
        origin: true,
        destination: true
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.transfers.findUnique({
      where: {
        id: id,
      },
      include: {
        origin: true,
        destination: true
      },
    });
  }

  remove(id: string) {
    const transfer = this.findOne(id);
    if (!transfer) throw new NotFoundException('Transfer not found');
    return this.prismaService.transfers.delete({
      where: {
        id: id,
      },
      include: {
        origin: true,
        destination: true
      },
    });
  }
}
