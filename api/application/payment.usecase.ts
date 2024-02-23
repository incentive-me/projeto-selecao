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

        const balance = await this.paymentRepository.VerifyBalanceAmount(payment)
        if (balance.totalValue < payment.amount) {
            throw Error("Insufficient funds")
        }
        
        const savePaymentOnDb = await this.paymentRepository.CreatePayment(payment, balance)

        return payment
    }

    async GetAllPayments(userInfo: UserInfo): Promise<any> {
        const payments = await this.paymentRepository.GetallPayments(userInfo)
        return payments
    }

    async DeletePayment(id: string): Promise<any> {
        const payment = await this.paymentRepository.GetPaymentById(id)
        const balance = await this.paymentRepository.VerifyBalanceAmount(payment)
        const deletePayment = await this.paymentRepository.DeletePayment(payment,balance)

        return deletePayment
    }

    async UpdatePaymentName(payment: Payment, newName: string): Promise<any> {
        if(newName.length < 3){
            throw Error("Name must have at least 3 characters")
        }

        if(newName === payment.name){
            throw Error("Name cannot be the same as the current one")
        }

        const updateName = await this.paymentRepository.UpdatePaymentName(payment, newName)
        if (updateName) {
            return { ...payment, name: newName}
        }
        
        throw Error("Payment name not update")
    }

    static validadePayment(payment: Payment): boolean | Error  {

        if(payment.name.length < 3) {
            throw Error("Name must have at least 3 characters")
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