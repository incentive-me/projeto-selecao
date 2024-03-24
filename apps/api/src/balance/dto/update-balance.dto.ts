import { PartialType } from '@nestjs/mapped-types';
import { CreateBalanceDto } from './create-balance.dto';
import { Exclude } from 'class-transformer';

export class UpdateBalanceDto extends PartialType(CreateBalanceDto) {
  @Exclude()
  initialValue: number;
}
