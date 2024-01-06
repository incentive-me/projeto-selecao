import { Payment } from "../../domain/payment.entity";
import { connection } from "../db/mysql";


interface PaymentRepositoryInterface {
    CreatePayment(payment: Payment): Promise<any>
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
}