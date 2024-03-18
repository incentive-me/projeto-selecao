import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTokenResponseDto } from './dto/get-token-response.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<GetTokenResponseDto> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: email })
        .getOne();

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        throw new HttpException('Usuário ou senha inválido', HttpStatus.BAD_REQUEST);
      }

      const payload = { id: user.id, email: user.email };

      return {
        token: await this.jwtService.signAsync(payload, {
          secret: process.env.SECRET,
        }),
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
