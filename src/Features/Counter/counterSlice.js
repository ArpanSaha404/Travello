import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name : 'counter',
    initialState : {
        value : 0,
        name : "abc"
    },
    reducers : {
        increment : (state) => {
            state.value += 1;
            state.name = "xyz" + state.value;
        },
        decrement : (state) => {
            state.value = state.value - 1;
        },
    },
});

export const {increment , decrement} = counterSlice.actions;
export default counterSlice.reducer;