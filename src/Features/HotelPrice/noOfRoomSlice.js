import { createSlice } from "@reduxjs/toolkit";

const noOfRoomSlice = createSlice({
    name : 'noRooms',
    initialState : {
        name : '',
        value : 0
    },
    reducers : {
        incrementRooms : (state , action) => {
            if(state.name === action.payload)
            {
                state.value += 1;
            }
            else
            {
                state.value = 1;
                state.name = action.payload;
            }
        },
        decrementRooms : (state , action) => {
            if(state.value > 0)
            {
                if(state.name === action.payload)
                {
                    state.value -= 1;
                }
                else
                {
                    state.value = 0;
                }
            }
        },
        resetRooms : (state) => {
            state.name = '';
            state.value = 0;
        }
    },
});

export const { incrementRooms , decrementRooms , resetRooms } = noOfRoomSlice.actions;
export default noOfRoomSlice.reducer;