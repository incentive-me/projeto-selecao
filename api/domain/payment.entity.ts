
export type Payment = {
    name: string,
    description: string,
    amount: number,
    balanceAccount: string
} 

export interface PaymentInterface {
    CreatePayment(payment: Payment): Promise<any>
}