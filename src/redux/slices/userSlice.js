import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'User',
    initialState : {
        user: null
    },
    reducers:{
        setLogin: (state, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state)=>{
            state.user = null;
        },
    }
})

export const {setLogin, setLogout} = userSlice.actions;

export default userSlice.reducer;