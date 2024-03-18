import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBalanceDto {
    @ApiProperty({ example: 'Saldo Janeiro' })
    @IsString({ message: 'Nome deve ser string'})
    @IsNotEmpty({ message: 'Informe o nome'})
    name: string;

    @ApiProperty({ example: 'Saldo referente ao mês de Janeiro' })
    @IsString({ message: 'Descrição deve ser string'})
    @IsNotEmpty({ message: 'Informe a descrição'})
    description: string;

    @ApiProperty({ example: 1500 })
    @IsNotEmpty({ message: 'Informe o valor inicial'})
    initialValue: number;

    finalValue?: number;
}
