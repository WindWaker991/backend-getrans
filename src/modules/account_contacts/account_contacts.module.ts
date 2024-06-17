import { Module } from '@nestjs/common';
import { AccountContactsService } from './account_contacts.service';
import { AccountContactsController } from './account_contacts.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AccountContactsController],
  providers: [AccountContactsService],
})
export class AccountContactsModule {}
