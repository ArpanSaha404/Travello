import mongo from "mongoose";

const bookedPackagesSchema = mongo.Schema({
    packageName : {
        type : String,
        required : true,
        ref : 'packageDetails'
    },
    bookedBy : {
        type : String,
        required : true,
        ref : 'Users'
    },
    dates : [{
        type : Date,
    }],
    bookingId : {
        type : String,
        unique : true,
        required : true,
    },
    bookingStatus : {
        type : String,
        required : true,
        enum : {
            values : ['saved' , 'confirmed'],
            message : props => `${props.value} is Not a Valid bookingStatus`,
        }
    },
    noOfPeople : {
        type : Number,
        default : 0,
    },
    noOfAdults : {
        type : Number,
        default : 0,
    },
    bookedHotels : {
        type : Boolean,
        required : true,
        enum : {
            values : [true , false],
            message : 'Value Can only be of Type Boolean',
        },
    },
    hotelName : {
        type : String,
        default : '',
        ref : 'packageDetails'
    },
    hotelNoOfRooms : {
        type : Number,
        default : 0,
    },
    packagePrice : {
        type : Number,
        default : 0,
    },
    totalPrice : {
        type : Number,
        default : 0,
    },
    paymentID : {
        type : String,
        unique : true,
    },
    paymentStatus : {
        type : String,
        defalt : 'unpaid',
        enum : {
            values : ['unpaid' , 'saved' , 'confirmed'],
            message : props => `${props.value} is Not a Valid paymentStatus`,
        }
    }
});

// module.exports = mongo.model('BookedPackages' , bookedPackages);

export const BookedPackages = mongo.model('BookedPackages' , bookedPackagesSchema);
