import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import paymentSlice from "./payment.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        payment: paymentSlice
    }})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;