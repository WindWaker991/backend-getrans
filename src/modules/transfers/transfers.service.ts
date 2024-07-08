import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransfersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTransferDto: CreateTransferDto) {
    return await this.prismaService.transfers.create({
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
            id: createTransferDto.originId,
          },
        },
        destination: {
          connect: {
            id: createTransferDto.destinationId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.transfers.findMany({
      include: {
        origin: true,
        destination: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.transfers.findUnique({
      where: {
        id: id,
      },
      include: {
        origin: true,
        destination: true,
      },
    });
  }

  async remove(id: string) {
    const transfer = this.findOne(id);
    if (!transfer) throw new NotFoundException('Transfer not found');
    return await this.prismaService.transfers.delete({
      where: {
        id: id,
      },
      include: {
        origin: true,
        destination: true,
      },
    });
  }

  async getTransferHistory(accountId: string) {
    const accountWithTransfer =
      await this.prismaService.bank_accounts.findUnique({
        where: { id: accountId },
        include: {
          transfers_origin: {
            include: {
              origin: true,
              destination: true,
            },
          },
          transfers_destination: {
            include: {
              origin: true,
              destination: true,
            },
          },
        },
      });
    if (!accountWithTransfer) {
      throw new NotFoundException('Account not found');
    }
    const transferHistory = [
      ...accountWithTransfer.transfers_origin,
      ...accountWithTransfer.transfers_destination,
    ];
    return transferHistory;
  }
}
