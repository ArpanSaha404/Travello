import mongo from "mongoose";

const packageDetailsSchema = new mongo.Schema(
    {
        packageTitle : {
            type : String,
            required : true,
            unique : true
        },
        subTitle : {
            type : String,
            required : true,
        },
        pics : [
            {
                type : String,
                required : true,
            },
        ],
        desc : {
            type : String,
            required : true,
        },
        rating : {
            type : Number,
            required : true,
        },
        type : {
            type : String,
            required : true,
            enum : {
                values : ['Domestic' , 'International'],
                message : "Invalid Package Type", 
            },
        },
        tripLength : {
            type : String,
            required : true,
        },
        price : {
            totalPrice : {
                type : Number,
                required : true,
            },
            currPrice : {
                type : Number,
                required : true,
            },
        },
        bestTime : [
            {
                months : {
                    type : String,
                    required : true,
                },
                points : [
                    {
                        type : String,
                        required : true,
                    }
                ],
            },
        ],
        thingsDoSee : {
            places : [
                {
                    type : String,
                    required : true,
                },
            ],
            placesPics : [
                {
                    type : String,
                    required : true,
                },
            ],
            foodieHotspots : [
                {
                    type : String,
                    required : true,
                },
            ],
            foodieHotspotsPics : [
                {
                    type : String,
                    required : true,
                },
            ],
            around : [
                {
                    type : String,
                    required : true,
                },
            ],
            aroundPics : [
                {
                    type : String,
                    required : true,
                },
            ],
        },
        hotels : {
            name: [
                {
                    type : String,
                    required : true,
                },
            ],
            hotelPics: [
                {
                    type : String,
                    required : true,
                },
            ],
            price : [
                {
                    type : Number,
                    required : true,
                },
            ],
            rating : [
                {
                    type : Number,
                    required : true,
                },
            ],
        },
    },
    {
        timestamps : true,
    },
);

export const PackageDetails = mongo.model('PackageDetails' , packageDetailsSchema);