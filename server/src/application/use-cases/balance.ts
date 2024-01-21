import { v4 as uuid } from 'uuid'
import { Balance, BalanceInterface } from '../entities/balance'
import { UserInfo } from '../entities/user'
import { BalanceValidator } from '../../helpers/balance-validation'
import BalanceRepository from '../../infra/repositories/balance-repository'

export class BalanceUseCase implements BalanceInterface {
  constructor(private balanceRepo: BalanceRepository) {
    this.balanceRepo = balanceRepo
  }

  async createBalance(
    userInfo: UserInfo,
    name: string,
    amount: number,
    description: string
  ): Promise<Balance | Error> {
    try {
      const newId = uuid()
      BalanceValidator.validateBalance(userInfo, name, amount)
      const newBalance: Balance = {
        id: newId,
        userId: userInfo.id,
        name: name,
        description: description,
        initialValue: amount,
        total: amount,
        usedValue: 0,
      }

      await this.balanceRepo.createBalance(newBalance)
      return newBalance
    } catch (error) {
      console.error('Error on create balance', error)
      throw error('Error on create balance')
    }
  }

  async findAllBalances(
    userInfo: UserInfo,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Balance[] | Error> {
    const offset = (page - 1) * pageSize
    return await this.balanceRepo.findAllBalances(userInfo, offset, pageSize)
  }

  async deleteBalance(id: string): Promise<boolean | Error> {
    if (!id) {
      throw Error('Id is required to delete balance')
    }

    return await this.balanceRepo.deleteBalance(id)
  }

  async updateBalance(balance: Balance, name: string): Promise<Balance | Error> {
    const isInvalidBalance = name?.length < 3 && !balance?.id
    if (isInvalidBalance) {
      throw Error(`Invalid arguments to update balance`)
    }
    const updateName = await this.balanceRepo.updateBalance(balance, name)
    if (updateName.affectedRows === 1) {
      return { ...balance, name: name }
    }
    return balance
  }

  async findBalanceById(id: string): Promise<Balance | Error> {
    if (!id) {
      throw Error('Id is required to find balance')
    }
    return await this.balanceRepo.findBalanceById(id)
  }
}
