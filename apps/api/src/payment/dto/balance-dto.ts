import { IsString } from 'class-validator';

export class BalanceDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
