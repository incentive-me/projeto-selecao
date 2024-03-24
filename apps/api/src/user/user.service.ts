import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByEmail(createUserDto.email))
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This user already exists',
        },
        HttpStatus.CONFLICT,
      );

    const data = {
      ...createUserDto,
      id: randomUUID(),
      password: await hash(createUserDto.password, 10),
    };

    const user = await this.prisma.user.create({
      data,
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
