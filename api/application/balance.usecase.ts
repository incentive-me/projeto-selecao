import { Balance, BalanceInterface } from "../domain/balance.entity";
import { v4 as uuid } from 'uuid'
import { UserInfo } from "../domain/user.entity";

export class BalanceUseCase implements BalanceInterface {
    constructor(){}

    CreateBalance(userInfo: UserInfo, balanceName: string, amount: number): Promise<Balance | Error> {
        const newId = uuid()

        const newBalance: Balance = {
            id: newId,
            userId: userInfo.id,
            balanceName: balanceName,
            initialValue: amount,
            totalValue: amount,
            valueUsed: 0
        } 

    }

    GetAllBalnces(): Promise<Balance | Error> {
        throw Error("test")
    }

    DeleteBalance(id: string): Promise<boolean | Error> {
        throw Error("test")
    }

    UpdateBalanceName(balance: Balance): Promise<Balance | Error> {
        throw Error("test")
    }

}