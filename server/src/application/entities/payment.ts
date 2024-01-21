import { UserInfo } from './user'

export type Payment = {
  id: string
  userId: string
  name: string
  description: string
  amount: number
  balanceId: string
  value?: number
}

export interface PaymentInterface {
  createPayment(userInfo: UserInfo, payment: Payment): Promise<any>
  findAllPayments(userInfo: UserInfo, page?: number, pageSize?: number): Promise<any>
  deletePayment(id: string): Promise<any>
  updatePayment(payment: Payment, name: string): Promise<any>
}
