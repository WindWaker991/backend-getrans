import { Test, TestingModule } from '@nestjs/testing';
import { TransfersService } from './transfers.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankAccountsModule } from '../bank_accounts/bank_accounts.module';
import { BankAccountsService } from '../bank_accounts/bank_accounts.service';

describe('TransfersService', () => {
  let service: TransfersService;
  let bankAccountsMockService: BankAccountsService;
  let prismaMockService: PrismaService;

  const prismaMock = {
    transfers: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };
  const bankAccountsMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransfersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: BankAccountsService,
          useValue: bankAccountsMock,
        }],
      imports: [PrismaModule, BankAccountsModule],
    }).compile();

    service = module.get<TransfersService>(TransfersService);
    prismaMockService = module.get<PrismaService>(PrismaService)
    bankAccountsMockService = module.get<BankAccountsService>(BankAccountsService)

  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should not create transfer because origin account not found', () => {
    const transfer = {
      //create transfer mock
    }

    const bankAccountNotFound = 'Origin account not found'
    prismaMock.transfers.create.mockResolvedValue(bankAccountNotFound)
    bankAccountsMock.findOne.mockResolvedValue(null)
    //expect(service.create(transfer)).rejects.toThrow(bankAccountNotFound))
  });

});
