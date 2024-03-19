import { PartialType } from '@nestjs/swagger';
import { CreateBalanceDto } from './create-balance.dto';

export class UpdateBalanceDto extends PartialType(CreateBalanceDto) {}
