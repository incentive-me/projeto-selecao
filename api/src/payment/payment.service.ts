import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { DataSource, Repository } from 'typeorm';
import { Balance } from '../balance/entities/balance.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    private dataSource: DataSource,
  ){}

  async create(createPaymentDto: CreatePaymentDto):Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const balanceId = createPaymentDto.id_balance
      const balance = await this.balanceRepository
        .createQueryBuilder('balance')
        .where('balance.id = :id', { id: balanceId })
        .getOne();
      
      if(!balance){
        throw new HttpException('Saldo não encontrado', HttpStatus.NOT_FOUND);
      }

      if(balance.finalValue < createPaymentDto.value){
        throw new HttpException('Saldo insuficiente', HttpStatus.NOT_ACCEPTABLE);
      }

      const payment = await queryRunner.manager.save(Payment, {
        name: createPaymentDto.name,
        description: createPaymentDto.description,
        value: createPaymentDto.value,
        balance: balance
      })

      await queryRunner.manager.update(Balance, balanceId, {
        finalValue: balance.finalValue - createPaymentDto.value,
      });

      await queryRunner.commitTransaction();
      
      const newPayment = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.balance', 'balance')
        .where('payment.id = :id', { id: payment.id })
        .getOne();
      
      return newPayment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.response, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      const payments = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.balance', 'balance')
        .getMany();

      if (payments.length) return payments;

      throw new HttpException('Você não possui pedidos abertos', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async findOne(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.balance', 'balance')
        .where('payment.id = :id', { id: id })
        .getOne();

      if (payment) return payment;

      throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const payment = await this.paymentRepository
        .createQueryBuilder('payment')
        .where('payment.id = :id', { id: id })
        .getExists();

      if (!payment) {
        throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);
      }

      await queryRunner.manager.update(Payment, id, {
        name: updatePaymentDto.name,
      });
      
      await queryRunner.commitTransaction();
      
      const updatedPayment = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.balance', 'balance')
        .where('payment.id = :id', { id: id })
        .getOne();
      
      return updatedPayment;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.response, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const payment = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.balance', 'balance')
        .where('payment.id = :id', { id: id })
        .getOne();

      if (!payment) {
        throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);
      }

      await queryRunner.manager.delete(Payment, id);

      const paymentBalance = payment.balance;

      if(paymentBalance){
        const finalValue = Number(paymentBalance.finalValue) + Number(payment.value);
        await queryRunner.manager.update(Balance, paymentBalance.id, {
          finalValue: finalValue,
        });
      }
      
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
