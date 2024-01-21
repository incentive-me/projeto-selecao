import { v4 as uuid } from 'uuid'

import { UserInfo } from '../entities/user'
import { PaymentInterface, Payment } from '../entities/payment'
import { PaymentValidator } from '../../helpers/payment-validation'
import { PaymentRepository } from '../../infra/repositories/payment-repository'

export class PaymentUseCase implements PaymentInterface {
  constructor(private paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async createPayment(userInfo: UserInfo, payment: Payment): Promise<any> {
    try {
      const newId = uuid()
      const newPayment: Payment = {
        id: newId,
        userId: userInfo.id,
        name: payment.name,
        description: payment.description,
        amount: payment.amount,
        balanceId: payment.balanceId,
      }
      PaymentValidator.validatePayment(newPayment)
      const balance = await this.paymentRepository.verifyBalanceAmount(newPayment)
      if (balance.total < newPayment.amount) {
        throw Error('Insufficient funds to make payment')
      }
      return await this.paymentRepository.createPayment(newPayment, balance)
    } catch (error) {
      console.error('Error on create payment', error)
      throw error('Error on create payment')
    }
  }

  async findAllPayments(userInfo: UserInfo, page: number = 1, pageSize: number = 10): Promise<any> {
    const offset = (page - 1) * pageSize
    const payments = await this.paymentRepository.findAllPayments(userInfo, offset, pageSize)
    return payments
  }

  async deletePayment(id: string): Promise<any> {
    const payment = await this.paymentRepository.findPaymentById(id)
    const balance = await this.paymentRepository.verifyBalanceAmount(payment)
    return await this.paymentRepository.deletePayment(payment, balance)
  }

  async updatePayment(payment: Payment, name: string): Promise<any> {
    if (name?.length < 3 || name === payment.name) {
      throw Error(' The payment attrs is not valid')
    }

    const updatedPayment = await this.paymentRepository.updatePayment(payment, name)
    if (updatedPayment) {
      return { ...payment, name: name }
    }
    return payment
  }
}
