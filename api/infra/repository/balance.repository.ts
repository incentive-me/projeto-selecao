import { Balance } from "../../domain/balance.entity";
import { UserInfo } from "../../domain/user.entity";
import { connection } from "../db/mysql";

interface BalanceInterface {
    CreateBalanceRepo(balance: Balance): Promise<any>
    GetAllBalances(userInfo: UserInfo): Promise<Balance[]>
}

export default class BalanceRepository implements BalanceInterface{
    async CreateBalanceRepo(balance: Balance): Promise<any> {
        const { id, userId, balanceName, initialValue, valueUsed, totalValue } = balance

        const [rows] = await connection.promise().query(
            `INSERT INTO balance (id, userId, balanceName, initialValue, valueUsed, totalValue) 
             VALUES (?, ?, ?, ?, ?, ?)`, [id, userId, balanceName, initialValue, valueUsed, totalValue]
        )
        return rows
    }

    async GetAllBalances(userInfo: UserInfo): Promise<any> {
        const { id } = userInfo

        const [rows] = await connection.promise().query(
            `SELECT * FROM balance WHERE userId = ?`, [id])

        return rows
    }

}