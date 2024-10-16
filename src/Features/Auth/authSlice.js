import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name : 'auth',
    initialState : {
        userName : "",
        email : "",
        isLoggedIn : false
    },
    reducers : {
        login : (state , action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.userName = "";
            state.email = "";
            state.isLoggedIn = false;
        }
    }
});

export const {login , logout} = authSlice.actions;

export const loginAsync = ({userName , email}) => (disptch) => {
    setTimeout(() => {
        disptch(login({userName , email}))
    },1000);
};
export default authSlice.reducer;