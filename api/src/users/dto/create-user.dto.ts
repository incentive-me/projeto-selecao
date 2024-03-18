import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Henrique Caires' })
    @IsString({ message: 'Nome deve ser string'})
    @IsNotEmpty({ message: 'Informe o nome'})
    name: string;

    @ApiProperty({ example: 'caires@email.com' })
    @IsString({ message: 'Email deve ser string'})
    @IsNotEmpty({ message: 'Informe o email'})
    @IsEmail({}, { message: 'E-mail inválido'})
    email: string;

    @ApiProperty({ example: 'Senha com mais de seis caracteres' })
    @IsString({ message: 'Senha deve ser string'})
    @IsNotEmpty({ message: 'Informe a senha'})
    password: string;
}
