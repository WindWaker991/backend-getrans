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

  async create(createTransferDto: CreateTransferDto) {
    const accountBankOrigFound = await this.bankAccountsService.findOne(createTransferDto.originId);
    console.log("🚀 ~ TransfersService ~ create ~ accountBankOrigFound:", accountBankOrigFound)
    if (!accountBankOrigFound) throw new NotFoundException('Origin account not found');
    const accountBankDestFound = await this.bankAccountsService.findOne(createTransferDto.destinationId);
    console.log("🚀 ~ TransfersService ~ create ~ accountBankDestFound:", accountBankDestFound)
    if (!accountBankDestFound) throw new NotFoundException('Destination account not found');

    // Check if origin account has enough balance
    if (accountBankOrigFound.balance < createTransferDto.amount) {
      throw new Error('Origin account has not enough balance');
    }

    // Update origin account balance
    //seba (origen)--> cristi (destino)
    const originBalance = accountBankOrigFound.balance - createTransferDto.amount;
    console.log("🚀 ~ TransfersService ~ create ~ originBalance:", originBalance)
    await this.bankAccountsService.update(
      (await accountBankOrigFound).id,
      {
        balance: originBalance,
      }
    );

    // Update destination account balance
    const destinationBalance = accountBankDestFound.balance + createTransferDto.amount;
    console.log("🚀 ~ TransfersService ~ create ~ destinationBalance:", destinationBalance)
    await this.bankAccountsService.update(
      (await accountBankDestFound).id,
      {
        balance: destinationBalance,
      }
    );


    return await this.prismaService.transfers.create({
      data: {
        amount: createTransferDto.amount,
        description: createTransferDto.description,
        date: createTransferDto.date,
        origin: {
          connect: {
            id: accountBankOrigFound.id,
          },
        },
        destination: {
          connect: {
            id: accountBankDestFound.id,
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
