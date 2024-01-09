import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import paymentSlice from "./payment.slice";
import balanceSlice from "./balance.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        payment: paymentSlice,
        balance: balanceSlice
    }})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;