import { Balance, BalanceInterface } from "../domain/balance.entity";
import { v4 as uuid } from 'uuid'
import { UserInfo } from "../domain/user.entity";

export class BalanceUseCase implements BalanceInterface {
    constructor(){}

    CreateBalance(userInfo: UserInfo, balanceName: string, amount: number): Promise<Balance | Error> {
        const newId = uuid()

        const verifyParams = BalanceUseCase.ValidateBalance(userInfo, balanceName, amount)
        if (!verifyParams) {
            throw Error("")
        }
        
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

    static ValidateBalance(userInfo: UserInfo, balanceName: string, amount: number): boolean | Error {
        if (!userInfo.id){
            throw Error("Id not found")
        }

        if (!balanceName){
            throw Error("Balance Name is required")
        }

        if (!amount){
            throw Error("Balance Name is required")
        }

    } 

}