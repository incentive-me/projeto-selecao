import { Payment, PaymentInterface } from "../domain/payment.entity";
import { v4 as uuid } from 'uuid'
import { UserInfo } from "../domain/user.entity";
import { PaymentRepository } from "../infra/repository/payment.repository";

export class PaymentUseCase implements PaymentInterface {
    constructor(private paymentRepository: PaymentRepository){
        this.paymentRepository = paymentRepository
    }

    async CreatePayment(userInfo: UserInfo, payment: Payment): Promise<any> {
        const paymentId = uuid();
        payment.id = paymentId
        payment.userId = userInfo.id

        const verifyParams = PaymentUseCase.validadePayment(payment)
        if(!verifyParams) {
            throw Error("Payment is invalid")
        }
        
        const savePaymentOnDb = await this.paymentRepository.CreatePayment(payment)
        console.log("result - savePaymentOnDb", savePaymentOnDb)

        return payment
    }

    static validadePayment(payment: Payment): boolean | Error  {
        const verifyParams = [payment.id, payment.userId, payment.name, payment.description, payment.amount, payment.balanceAccount]

        if(payment.name.length < 3) {
            throw Error("name is invalid")
        } 

        if(!payment.name) {
            throw Error("name is required")
        }
        
        if(!payment.balanceAccount) {
            throw Error("balanceAccount is required")
        }
        
        if(!payment.amount) {
            throw Error("amount is required")
        }

        return true
    }
}