import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentView } from './models/PaymentView';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createBalanceDto: CreatePaymentDto) {
    const balance = await this.prisma.balance.findUnique({
      where: {
        id: createBalanceDto.balance.id,
      },
    });

    if (!balance)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The requested balance with the provided id does not exist.',
        },
        HttpStatus.NOT_FOUND,
      );

    if (createBalanceDto.value > balance.remainingValue)
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error:
            'The remaining value of this balance is not enough for this value',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const payment = await this.prisma.payment.create({
      data: {
        id: randomUUID(),
        userId,
        balanceId: createBalanceDto.balance.id,
        balanceName: createBalanceDto.balance.name,
        description: createBalanceDto.description,
        name: createBalanceDto.name,
        value: createBalanceDto.value,
      },
    });

    await this.prisma.balance.update({
      where: {
        id: payment.balanceId,
      },
      data: {
        remainingValue: {
          decrement: payment.value,
        },
      },
    });

    return this.renderView(payment);
  }

  async findAll() {
    const payments = await this.prisma.payment.findMany();

    return payments.map((payment) => this.renderView(payment));
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });

    return this.renderView(payment);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.prisma.payment.update({
      data: updatePaymentDto,
      where: {
        id,
      },
    });

    return this.renderView(payment);
  }

  async remove(id: string) {
    const payment = await this.prisma.payment.delete({ where: { id } });

    await this.prisma.balance.update({
      where: {
        id: payment.balanceId,
      },
      data: {
        remainingValue: {
          increment: payment.value,
        },
      },
    });
  }

  private renderView(payment: Payment): PaymentView {
    return {
      id: payment.id,
      name: payment.name,
      description: payment.description,
      value: payment.value,
      balance: {
        id: payment.balanceId,
        name: payment.balanceName,
      },
    };
  }
}
