import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('Bearer')
@UseGuards(JwtAuthGuard)
@Controller('balance')
@ApiTags('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto) {
    return this.balanceService.insertOne(createBalanceDto);
  }

  @Get()
  findAll(): Promise<Balance[]> {
    return this.balanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.update(id, updateBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balanceService.remove(id);
  }
}
