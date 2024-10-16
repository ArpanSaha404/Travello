import {configureStore} from '@reduxjs/toolkit';
import counterSlice from '../Features/Counter/counterSlice';
import authSlice from '../Features/Auth/authSlice';
import noOfPeopleSlice from '../Features/PackagePrice/noOfPeopleSlice';
import packagePriceSlice from '../Features/PackagePrice/packagePriceSlice';
import hotelPriceSlice from '../Features/HotelPrice/hotelPriceSlice';
import noOfRoomSlice from '../Features/HotelPrice/noOfRoomSlice';


export const store = configureStore({
    reducer : {
        auth : authSlice,
        counter :  counterSlice,
        noPeople : noOfPeopleSlice,
        packagePrice : packagePriceSlice,
        noRooms : noOfRoomSlice,
        hotelPrice : hotelPriceSlice,
    },
});