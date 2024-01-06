import { Balance, BalanceInterface } from "../domain/balance.entity";
import { v4 as uuid } from 'uuid'
import { UserInfo } from "../domain/user.entity";
import BalanceRepository from "../infra/repository/balance.repository";

export class BalanceUseCase implements BalanceInterface {
    constructor(private balanceRepo: BalanceRepository){
        this.balanceRepo = balanceRepo
    }

    async CreateBalance(userInfo: UserInfo, balanceName: string, amount: number): Promise<Balance | Error> {
        const newId = uuid();

        const verifyParams = BalanceUseCase.validateBalance(userInfo, balanceName, amount)
        if (!verifyParams) {
            throw Error("Balance invalid")
        }
        
        const newBalance: Balance = {
            id: newId,
            userId: userInfo.id,
            balanceName: balanceName,
            initialValue: amount,
            totalValue: amount,
            valueUsed: 0
        } 

        const saveDb = await this.balanceRepo.CreateBalanceRepo(newBalance)

        return newBalance
    }

    async GetAllBalances(userInfo: UserInfo): Promise<Balance | Error> {
        const getBalances = await this.balanceRepo.GetAllBalances(userInfo)
        return getBalances
    }

    DeleteBalance(id: string): Promise<boolean | Error> {
        throw Error("test")
    }

    UpdateBalanceName(userInfo: UserInfo, balance: Balance, newName: string): Promise<Balance | Error> {
        throw Error("test")
    }

    static validateBalance(userInfo: UserInfo, balanceName: string, amount: number): boolean | Error {
        if (!userInfo.id){
            throw Error("Id not found")
        }

        if (!balanceName){
            throw Error("Balance Name is required")
        }

        if (!amount){
            throw Error("Balance Amount is required")
        }
        return true

    } 

}