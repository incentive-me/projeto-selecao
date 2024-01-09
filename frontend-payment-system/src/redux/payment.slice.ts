import { createSlice } from "@reduxjs/toolkit";

export const initialPaymentState: PaymentState = {
    payment: {
        id: "",
        userId: "",
        name: "",
        description: "",
        amount: 0,
        balanceAccount: "",    }
}

const paymentSlice = createSlice({
    initialState: initialPaymentState,
    name: 'paymentState',
    reducers: {
        fetchPayments: (action, state) => {
            void(action.payment = state.payload)
        }
    }
})

interface PaymentState {
    payment: Payment
}

export type Payment = {
    id: string;
    userId: string;
    name: string,
    description: string,
    amount: number,
    balanceAccount: string
} 

export const {fetchPayments} = paymentSlice.actions
export default paymentSlice.reducer