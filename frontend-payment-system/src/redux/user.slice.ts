import { createSlice } from "@reduxjs/toolkit"

export const initialUserState = {
    user:{
        "id": "",
        "name": "",
        "email": ""
    }
}

const userSlice = createSlice({
    initialState: initialUserState,
    name: "user",
    reducers: {
        fecthUser: (state, action) => state.user = action.payload
    }
})

export const {fecthUser} = userSlice.actions
export default userSlice.reducer