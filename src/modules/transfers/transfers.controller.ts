import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) { }

  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transfersService.create(createTransferDto);
  }

  @Get()
  findAll() {
    return this.transfersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transfersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transfersService.remove(id);
  }

  @Get('history/:id')
  history(@Param('id') id: string) {
    return this.transfersService.getTransferHistory(id);
  }
}
