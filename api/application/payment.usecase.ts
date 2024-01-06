import { Payment, PaymentInterface } from "../domain/payment.entity";
import { v4 as uuid } from 'uuid'

export class PaymentUseCase implements PaymentInterface {

    CreatePayment(payment: Payment): Promise<any> {
        const paymentId = uuid()
        payment.id = paymentId

        const verifyParams = PaymentUseCase.validadePayment(payment)
        if(!verifyParams) {
            throw Error("Payment is invalid")
        }

        
    }

    static validadePayment(payment: Payment): boolean | Error  {
        const verifyParams = [payment.id, payment.name, payment.description, payment.amount, payment.balanceAccount]

        if(payment.name.length < 3) {
            throw Error("Name is invalid")
        } 

        for(let i = 0; i < verifyParams.length; i++) {
            if (!verifyParams[i]){
                throw Error(`${Object.keys(verifyParams[i])} is invalid`)
            }
        }
        return true
    }
}