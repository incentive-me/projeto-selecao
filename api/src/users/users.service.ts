import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (createUserDto.password.length < 6){
        throw new HttpException('Senha deve ter no mínimo 6 caracteres', HttpStatus.NOT_ACCEPTABLE);
      }
      const password = await bcrypt.hash(createUserDto.password, 10);

      if (await this.checkEmail(createUserDto.email)) {
        throw new HttpException('E-mail já cadastrado', HttpStatus.CONFLICT);
      }

      const user = await queryRunner.manager.save(User, {
        name: createUserDto.name,
        email: createUserDto.email,
        password: password,
      })

      await queryRunner.commitTransaction();
      
      const newUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: user.id })
        .getOne();
      
      return newUser;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.response, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<User> {
    try{
      const newUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: id })
        .getOne();
      
      if (newUser) return newUser;
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async checkEmail(email: string) {
    const emailExiste = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getExists();

    return emailExiste;
  }
}
