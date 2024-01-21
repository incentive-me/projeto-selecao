import { PrismaClient } from '@prisma/client'
import { Balance } from '../../application/entities/balance'
import { UserInfo } from '../../application/entities/user'

interface BalanceInterface {
  createBalance(balance: Balance): Promise<any>
  findAllBalances(
    userInfo: UserInfo,
    offset?: number,
    pageSize?: number
  ): Promise<Balance[] | Error>
  deleteBalance(id: string): Promise<any>
  updateBalance(balance: Balance, name: string): Promise<any>
  findBalanceById(id: string): Promise<any>
}

export default class BalanceRepository implements BalanceInterface {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient()
  }

  async createBalance(balance: Balance): Promise<any> {
    const { id, userId, name, initialValue, usedValue, total, description } = balance
    const newBalance = await this.prisma.balance.create({
      data: {
        id,
        userId,
        name,
        initialValue,
        usedValue: usedValue,
        total,
        description,
      } as any,
    })
    return newBalance
  }

  async findAllBalances(
    userInfo: UserInfo,
    offset?: number,
    pageSize?: number
  ): Promise<Balance[] | Error> {
    const balances = await this.prisma.balance.findMany({
      where: {
        userId: userInfo.id,
      },
      take: pageSize,
      skip: offset,
    })
    return balances as any
  }

  async findBalanceById(id: string): Promise<any> {
    const balance = await this.prisma.balance.findUnique({
      where: {
        id: id,
      },
    })
    return balance
  }

  async deleteBalance(id: string): Promise<any> {
    const deletedBalance = await this.prisma.balance.delete({
      where: {
        id: id,
      },
    })
    return deletedBalance
  }

  async updateBalance(balance: Balance, name: string): Promise<any> {
    const updatedBalance = await this.prisma.balance.update({
      where: {
        id: balance.id,
      },
      data: {
        name,
      },
    })
    return updatedBalance
  }
}
