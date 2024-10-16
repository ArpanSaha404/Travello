import mongo from "mongoose";

const userSchema = new mongo.Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phnNo : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
        enum : {
            values : ['User' , 'Admin'],
            message : props => `${props.value} is Not a Valid Type`,
        },
    },
    bookedPackages : [
        {
            type : mongo.Types.ObjectId,
            ref : 'bookedPackages'
        },
    ],
});

export const Users = mongo.model('Users' , userSchema);