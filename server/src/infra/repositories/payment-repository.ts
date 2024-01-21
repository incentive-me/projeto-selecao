import { Payment } from '../../application/entities/payment'
import { Balance } from '../../application/entities/balance'
import { UserInfo } from '../../application/entities/user'

import { PrismaClient } from '@prisma/client'

interface PaymentRepositoryInterface {
  createPayment(payment: Payment, balance: Balance): Promise<any>
  findAllPayments(userInfo: UserInfo, offset?: number, pageSize?: number): Promise<any>
  deletePayment(payment: Payment, balance: Balance): Promise<any>
  updatePayment(payment: Payment, newName: string): Promise<any>
  verifyBalanceAmount(payment: Payment): Promise<any>
  findPaymentById(id: string): Promise<any>
}

export class PaymentRepository implements PaymentRepositoryInterface {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient()
  }

  async createPayment(payment: Payment, balance: Balance): Promise<any> {
    const newPayment = await this.prisma.payment.create({
      data: {
        id: payment.id,
        name: payment.name,
        description: payment.description,
        value: payment.amount,
        balanceId: balance.id,
        userId: payment.userId,
      },
    })
    const newBalanceAmount = balance.total - payment.amount
    const newBalanceUsed: number = Number(balance.usedValue) + Number(payment.amount)
    await this.prisma.balance.update({
      where: {
        id: balance.id,
      },
      data: {
        total: newBalanceAmount,
        usedValue: newBalanceUsed,
      },
    })
    return newPayment
  }

  async findAllPayments(userInfo: UserInfo, offset: number, pageSize: number): Promise<any> {
    const payments = await this.prisma.payment.findMany({
      where: {
        userId: userInfo.id,
      },
      take: pageSize,
      skip: offset,
    })
    return payments
  }

  async findPaymentById(id: string): Promise<any> {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id: id,
      },
    })
    return payment
  }

  async deletePayment(payment: Payment, balance: Balance): Promise<any> {
    const deletedPayment = await this.prisma.payment.delete({
      where: {
        id: payment.id,
      },
    })

    const newBalanceAmount = balance.total + Number(payment.value)
    const newBalanceUsed: number = Number(balance.usedValue) - Number(payment.value)
    await this.prisma.balance.update({
      where: {
        id: balance.id,
      },
      data: {
        total: newBalanceAmount,
        usedValue: newBalanceUsed,
      },
    })
    return deletedPayment
  }

  async updatePayment(payment: Payment, name: string): Promise<any> {
    const updatedPayment = await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        name,
      },
    })
    return updatedPayment
  }

  async verifyBalanceAmount(payment: Payment): Promise<any> {
    const balance = await this.prisma.balance.findUnique({
      where: {
        id: payment?.balanceId,
      },
    })
    return balance
  }
}
