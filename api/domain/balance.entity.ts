import { UserInfo } from "./user.entity"

export type Balance = {
    id: string,
    userId: string,
    balanceName: string,
    initialValue: number,
    valueUsed: number,
    totalValue: number
}

export interface BalanceInterface {
    CreateBalance(userInfo: UserInfo, balanceName: string, amount: number): Promise<Balance | Error>
    GetAllBalances(userInfo: UserInfo): Promise<Balance | Error>
    DeleteBalance(id: string): Promise<boolean | Error>
    UpdateBalanceName(balance: Balance, newName: string): Promise<Balance | Error>
}