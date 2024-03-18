import { IsNumber, IsObject, IsString } from 'class-validator';
import { BalanceDto } from './balance-dto';

export class CreatePaymentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsObject()
  balance: BalanceDto;
}
