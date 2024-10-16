import { createSlice } from "@reduxjs/toolkit";

export const packagePriceSlice = createSlice({
    name : 'packagePrice',
    initialState : {
        adultCounter : 0,
        childCounter : 0,
        adultValue : 0,
        childValue : 0,
    },
    reducers : {
        priceIncrementAdult : (state , action) => {
            state.adultCounter += 1;
            state.adultValue += action.payload;
        },
        priceDecrementAdult : (state , action) => {
            if(state.adultCounter > 0)
            {
                state.adultCounter -= 1;
                state.adultValue -= action.payload;
            }
        },
        priceIncrementChild : (state , action) => {
            if(state.adultCounter > 0)
            {
                state.childCounter += 1;
                state.childValue += Math.ceil((action.payload/2));
            }
        },
        priceDecrementChild : (state , action) => {
            if(state.childCounter > 0)
            {
                state.childCounter -= 1;
                state.childValue -= Math.ceil((action.payload/2));
            }
            
        },
        resetPriceNo : (state) => {
            state.adultCounter = 0;
            state.adultValue = 0;
            state.childCounter = 0;
            state.childValue = 0;
        }
    },
});

export const { priceIncrementAdult , priceDecrementAdult , priceIncrementChild , priceDecrementChild , resetPriceNo } = packagePriceSlice.actions;
export default packagePriceSlice.reducer;