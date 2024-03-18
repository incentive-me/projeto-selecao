import { IsNumber, IsString } from 'class-validator';

export class CreateBalanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  initialValue: number;
}
