import { IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
