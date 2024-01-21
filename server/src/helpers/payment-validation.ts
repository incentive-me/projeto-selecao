import { Payment } from '../application/entities/payment'

export class PaymentValidator {
  static validatePayment(payment: Payment): boolean {
    try {
      this.validateField(payment.name, 'Name', payment.name.length >= 3)
      this.validateField(payment.balanceId, 'Balance id')
      this.validateField(payment.amount, 'Amount')
      return true
    } catch (error) {
      throw error('Error on validate fields payment')
    }
  }

  private static validateField(value: any, fieldName: string, isValid: boolean = true): void {
    if (!value || !isValid) {
      throw new Error(`${fieldName} ${!isValid ? 'must have valid value' : 'is required'}`)
    }
  }
}
