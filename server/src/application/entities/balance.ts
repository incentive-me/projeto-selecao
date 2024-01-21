import { UserInfo } from './user'

export interface Balance {
  id: string
  userId: string
  name: string
  description: string
  initialValue: number
  usedValue: number
  total: number
}

export interface BalanceInterface {
  createBalance(
    userInfo: UserInfo,
    name: string,
    amount: number,
    description: string
  ): Promise<Balance | Error>
  findAllBalances(userInfo: UserInfo): Promise<Balance[] | Error>
  deleteBalance(id: string): Promise<boolean | Error>
  updateBalance(balance: Balance, name: string, description: string): Promise<Balance | Error>
  findBalanceById(id: string): Promise<Balance | Error>
}
