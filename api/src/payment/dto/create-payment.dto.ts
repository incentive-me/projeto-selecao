import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({ example: 'Pagamento energia' })
    @IsString({ message: 'Nome deve ser string'})
    @IsNotEmpty({ message: 'Informe o nome'})
    name: string;

    @ApiProperty({ example: 'Pagamento da fatura de energia do mês de janeiro' })
    @IsString({ message: 'Descrição deve ser string'})
    @IsNotEmpty({ message: 'Informe a descrição'})
    description: string;

    @ApiProperty({ example: 87 })
    @IsNotEmpty({ message: 'Informe o valor'})
    value: number;

    @ApiProperty({ example: 'UUID de algum saldo' })
    @IsString({ message: 'Id Balance deve ser string'})
    id_balance: string;
}
