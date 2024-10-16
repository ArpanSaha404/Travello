import { createSlice } from "@reduxjs/toolkit";

export const hotelPriceSlice = createSlice({
    name : 'hotelPrice',
    initialState : {
        name : '',
        value : 0,
    },
    reducers : {
        incrementPrice : (state , action) => {
            if(state.name === action.payload.name)
            {
                state.value += action.payload.value;
            }
            else
            {
                state.value = action.payload.value;
                state.name = action.payload.name;
            }
        },
        decrementPrice : (state , action) => {
            if(state.value > 0)
            {
                if(state.name === action.payload.name)
                {
                    state.value -= action.payload.value;
                }
                else
                {
                    state.value = 0;
                    state.name = action.payload.name;
                }
            }
        },
        resetPrice : (state) => {
            state.name = '';
            state.value = 0;
        }
    },
});

export const { incrementPrice , decrementPrice , resetPrice } = hotelPriceSlice.actions;
export default hotelPriceSlice.reducer;