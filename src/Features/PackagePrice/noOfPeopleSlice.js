import { createSlice } from "@reduxjs/toolkit";

export const noOfPeopleSlice = createSlice({
    name : 'noPeople',
    initialState : {
        adultCounter : 0,
        childCounter : 0,
    },
    reducers : {
        incrementAdult : (state) => {
            state.adultCounter += 1;
        },
        decrementAdult : (state) => {
            if(state.adultCounter > 0)
            {
                state.adultCounter -= 1;
            }
        },
        incrementChild : (state) => {
            state.childCounter += 1;
        },
        decrementChild : (state) => {
            if(state.childCounter > 0)
            {
                state.childCounter -= 1;
            }
        },
    },
});


export const { incrementAdult , decrementAdult , incrementChild , decrementChild } = noOfPeopleSlice.actions;
export default noOfPeopleSlice.reducer;