import { Balance } from "../../domain/balance.entity";
import { UserInfo } from "../../domain/user.entity";
import { connection } from "../db/mysql";

interface BalanceInterface {
    CreateBalanceRepo(balance: Balance): Promise<any>
    GetAllBalances(userInfo: UserInfo): Promise<Balance[]>
    DeleteBalances(id: string): Promise<any>
    UpdateNameBalance(balance: Balance, newName: string): Promise<any>
}

export default class BalanceRepository implements BalanceInterface{
    async CreateBalanceRepo(balance: Balance): Promise<any> {
        const { id, userId, balanceName, initialValue, valueUsed, totalValue, description } = balance

        const [rows] = await connection.promise().query(
            `INSERT INTO balance (id, userId, balanceName, initialValue, valueUsed, totalValue, description) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`, 
             [id, userId, balanceName, initialValue, valueUsed, totalValue, description]
        )
        return rows
    }

    async GetAllBalances(userInfo: UserInfo): Promise<any> {
        const { id } = userInfo

        const [rows] = await connection.promise().query(
            `SELECT * FROM balance WHERE userId = ?`, [id])

        return rows
    }

    async DeleteBalances(id: string): Promise<any>{
        const [rows] = await connection.promise().query(
            `DELETE FROM balance WHERE id = ?`, [id])
        
        return rows
    }

    async UpdateNameBalance(balance: Balance, newName: string): Promise<any> {
        const [results] = await connection.promise().query(
            `UPDATE balance SET balanceName = ? WHERE id = ?`, [newName, balance.id])

        return results
    }
}