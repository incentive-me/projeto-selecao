import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    private dataSource: DataSource,
  ){}

  async insertOne(createBalanceDto: CreateBalanceDto): Promise<Balance> {
    try {
      createBalanceDto.finalValue = createBalanceDto.initialValue;
      const newBalance = this.balanceRepository.create(createBalanceDto);
      await this.balanceRepository.save(newBalance);
      
      return newBalance;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async findAll(): Promise<Balance[]> {
    try {

      const balances = await this.balanceRepository.find();
      if (balances.length) return balances;

      throw new HttpException('Você não possui saldos', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async findOne(id: string): Promise<Balance> {
    try {

      const balance = await this.balanceRepository.findOneOrFail({ where: { id } });

      if (balance) return balance;

      throw new HttpException('Saldos não encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async update(id: string, updateBalanceDto: UpdateBalanceDto): Promise<Balance> {
    try {
      await this.balanceRepository.update(id, {name: updateBalanceDto.name});
      return this.findOne(id);

    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async remove(id: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const balance = await this.balanceRepository
        .createQueryBuilder('balance')
        .leftJoinAndSelect('balance.payment', 'payment')
        .where('balance.id = :id', {id: id})
        .getOne();

      if (!balance) {
        throw new HttpException('Saldos não encontrado', HttpStatus.NOT_FOUND);
      }

      const paymant = balance.payment;
      if(paymant.length){
        throw new HttpException('Saldo tem pagamentos vinculados', HttpStatus.NOT_ACCEPTABLE);
      }

      await queryRunner.manager.delete(Balance, id);
      
      await queryRunner.commitTransaction();
      
      return;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.response, error.status);
    } finally {
      await queryRunner.release();
    }
  }
}
