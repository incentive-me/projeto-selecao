import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialBalanceState: BalanceState = {
    balance: []
}

const balanceSlice = createSlice({
    name: 'balanceState',
    initialState: initialBalanceState,
    reducers: {
        fetchBalances: (state, action) => void(state.balance = action.payload),
        updateName: (state, action: PayloadAction<Balance>) => {
            state.balance = state.balance.map((balance) => {
                if(balance.id === action.payload.id){
                    balance.balanceName = action.payload.balanceName
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

export const {fetchBalances, updateName} = balanceSlice.actions
export default balanceSlice.reducer