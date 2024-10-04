import mongo from "mongoose";

const bookedHotels = mongo.Schema({
    bookedBy : {
        type : mongo.Types.ObjectID,
        ref : 'Users',
    },
    bookedDate : {
        type : Date,
        required : true,
    },
    rating  : {
        type : Number,
        required : true,
    },
});

export const BookedHotels = mongo.model('BookedHotels' , bookedHotels);