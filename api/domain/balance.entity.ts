import { UserInfo } from "./user.entity"

export type Balance = {
    id: string,
    userId: string,
    balanceName: string,
    description: string,
    initialValue: number,
    valueUsed: number,
    totalValue: number
}

export interface BalanceInterface {
    CreateBalance(userInfo: UserInfo, balanceName: string, amount: number, description: string): Promise<Balance | Error>
    GetAllBalances(userInfo: UserInfo): Promise<Balance | Error>
    DeleteBalance(id: string): Promise<boolean | Error>
    UpdateBalanceName(balance: Balance, newName: string, description: string): Promise<Balance | Error>
}