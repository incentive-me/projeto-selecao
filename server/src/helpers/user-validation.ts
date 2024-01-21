import { User } from '../application/entities/user'

export class UserValidator {
  static validateUser(user: User): User {
    this.validateField(user.id, 'Id')
    this.validateField(user.name, 'Name')
    this.validateField(user.email, 'Email', this.isValidEmail(user.email))
    this.validateField(user.password, 'Password')

    return user
  }

  private static validateField(
    value: string | undefined,
    fieldName: string,
    isValid: boolean = true
  ): void {
    if (!value || !isValid) {
      throw new Error(`${fieldName} ${!isValid ? 'is not valid' : 'is required'}`)
    }
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
  }
}
