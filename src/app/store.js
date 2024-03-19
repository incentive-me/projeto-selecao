import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


const counterSlice = createSlice({
  name: 'alert',
  initialState: {
    open: false,
    message: '',
    variant: ''
  },
  reducers: {
    setAlertShow: (state, action) => {
      state.open = action.payload.open
      state.message = action.payload.message
      state.variant = action.payload.variant
    }
  },
})

export const { setAlertShow } = counterSlice.actions

export default configureStore({ reducer: { alert: counterSlice.reducer } })