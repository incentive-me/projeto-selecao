import { Payment } from "../../domain/payment.entity";
import { UserInfo } from "../../domain/user.entity";
import { connection } from "../db/mysql";


interface PaymentRepositoryInterface {
    CreatePayment(payment: Payment): Promise<any>
    GetallPayments(userInfo: UserInfo): Promise<any>
    DeletePayment(id: string): Promise<any>
    UpdatePaymentName(payment: Payment, newName: string): Promise<any>
    VerifyBalanceAmount(payment: Payment): Promise<any>
}

export class PaymentRepository implements PaymentRepositoryInterface {
    async CreatePayment(payment: Payment): Promise<any> {
        const [rows] = await connection.promise().query(
            `INSERT INTO payment (id, userId, name, description, amount, balanceAccount)
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [
                payment.id, 
                payment.userId, 
                payment.name, 
                payment.description, 
                payment.amount,
                payment.balanceAccount
            ]
        )
        return rows
    }

    async GetallPayments(userInfo: UserInfo): Promise<any>{
        const [rows] = await connection.promise().query(
            `SELECT * FROM payment WHERE userId = ?`, [userInfo.id]
        )
        return rows
    }

    async DeletePayment(id: string): Promise<any>{
        const [rows] = await connection.promise().query(
            `DELETE FROM payment WHERE id = ?`, [id]
        )
        return rows
    }

    async UpdatePaymentName(payment: Payment, newName: string): Promise<any>{
        const [rows] = await connection.promise().query(
            `UPDATE payment SET name = ? WHERE id = ?`, [newName, payment.id]
        )
      
        if(rows) {
            return true
        }

        return false
    }
}