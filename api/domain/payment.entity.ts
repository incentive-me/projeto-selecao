import { UserInfo } from "./user.entity";

export type Payment = {
    id: string;
    userId: string;
    name: string,
    description: string,
    amount: number,
    balanceAccount: string
} 

export interface PaymentInterface {
    CreatePayment(userInfo: UserInfo, payment: Payment): Promise<any>
}