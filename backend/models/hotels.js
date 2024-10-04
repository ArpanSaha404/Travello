import mongo from "mongoose";

const hotelSchema = mongo.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        price : {
            type : String,
            required : true,
        },
        rating : {
            type : Number,
            required : true,
        },
    },
    {
        timestamps : true,
    },
);

export const Hotels = mongo.model('Hotels' , hotelSchema)