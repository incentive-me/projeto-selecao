import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialPaymentState: PaymentState = {
    payment: []
}

const paymentSlice = createSlice({
    initialState: initialPaymentState,
    name: 'paymentState',
    reducers: {
        fetchPayments: (state, action) => void(state.payment = action.payload),
        updatePaymentName: (state, action: PayloadAction<Payment>) => {
            state.payment = state.payment.map((pay) => {
                if(pay.id === action.payload.id) {
                    pay.name = action.payload.name
                }
                return pay
            })
        },
        createPayment: (state, action) => {
            state.payment.push(action.payload)
        },
        deletePaymentAction: (state, action: PayloadAction<Payment>) => {
            state.payment = state.payment.filter((pay: Payment) =>
                pay.id !== action.payload.id
            )
        }
    }
})

interface PaymentState {
    payment: Payment[]
}

export type Payment = {
    id: string;
    userId: string;
    name: string,
    description: string,
    amount: number,
    balanceAccount: string
} 

export const {fetchPayments, updatePaymentName, createPayment, deletePaymentAction} = paymentSlice.actions
export default paymentSlice.reducer