import { UserInfo } from '../application/entities/user'

export class BalanceValidator {
  static validateBalance(userInfo: UserInfo, balance: string, amount: number): boolean {
    try {
      this.validateField(userInfo.id, 'Id')
      this.validateField(balance, 'Balance')
      this.validateField(amount, 'Balance Amount')

      return true
    } catch (error) {
      throw error('Error on validate fields balance')
    }
  }

  private static validateField(value: any, fieldName: string): void {
    if (!value) {
      throw new Error(`${fieldName} is required`)
    }
  }
}
