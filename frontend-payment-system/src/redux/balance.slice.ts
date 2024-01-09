import { createSlice } from "@reduxjs/toolkit"

const initialBalanceState: BalanceState = {
    balance: []
}

const balanceSlice = createSlice({
    name: 'balanceState',
    initialState: initialBalanceState,
    reducers: {
        fetchBalances: (action, state) => void(action.balance = state.payload) 
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

export const {fetchBalances} = balanceSlice.actions
export default balanceSlice.reducer