import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Payment } from "./payment.slice"

const initialBalanceState: BalanceState = {
    balance: []
}

const balanceSlice = createSlice({
    name: 'balanceState',
    initialState: initialBalanceState,
    reducers: {
        fetchBalances: (state, action) => void(state.balance = action.payload),
        createBalance: (state, action: PayloadAction<Balance>) => {
            state.balance.push(action.payload)
        },
        updateName: (state, action: PayloadAction<Balance>) => {
            state.balance = state.balance.map((balance) => {
                if(balance.id === action.payload.id){
                    balance.balanceName = action.payload.balanceName
                }
            return balance
            })  
        },
        decreaseBalance: (state, action: PayloadAction<Payment>) => {
            state.balance = state.balance.map((balance) => {
                if(balance.id === action.payload.balanceAccount){
                    balance.valueUsed = Number(balance.valueUsed) + Number(action.payload.amount)
                    balance.totalValue = Number(balance.totalValue) - Number(action.payload.amount)
                }
            return balance
            })  
        },
        deleteBalanceState: (state, action: PayloadAction<Balance>) => {
            state.balance = state.balance.filter((balance) => 
                balance.id !== action.payload.id
                
            ) 
        },
        increaseBalance: (state, action: PayloadAction<Payment>) => {
            state.balance = state.balance.map((balance) => {
                if(balance.id === action.payload.balanceAccount){
                    balance.totalValue = Number(balance.totalValue) + Number(action.payload.amount) 
                    balance.valueUsed = Number(balance.valueUsed) - Number(action.payload.amount) 
                }
            return balance
            })  
        }
    }
})

interface BalanceState {
    balance: Balance[]
}

export type Balance = {
    id: string,
    userId: string,
    balanceName: string,
    description: string,
    initialValue: number,
    valueUsed: number,
    totalValue: number
}

export const {fetchBalances, updateName, createBalance, decreaseBalance, deleteBalanceState, increaseBalance} = balanceSlice.actions
export default balanceSlice.reducer