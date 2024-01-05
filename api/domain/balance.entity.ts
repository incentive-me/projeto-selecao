
type Balance = {
    id: string,
    userId: string,
    balanceName: string,
    initialValue: number,
    valueUsed: number,
    totalValue: number
}

export interface BalanceInterface {
    CreateBalance(): Balance | Error
    GetAllBalnces(): Balance | Error
    DeleteBalance(id: string): boolean | Error
    UpdateBalanceName(balance: Balance): Balance | Error
}