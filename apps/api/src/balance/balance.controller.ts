import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@Controller('api/balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post()
  create(
    @CurrentUser() user: UserFromJwt,
    @Body() createBalanceDto: CreateBalanceDto,
  ) {
    return this.balanceService.create(user.id, createBalanceDto);
  }

  @Get()
  findAll() {
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
