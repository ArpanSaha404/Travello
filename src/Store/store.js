import {configureStore} from '@reduxjs/toolkit';
import counterSlice from '../Features/Counter/counterSlice';
import authSlice from '../Features/Auth/authSlice';


export const store = configureStore({
    reducer : {
        auth : authSlice,
        counter :  counterSlice,
        
    },
});