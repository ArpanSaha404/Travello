import mongo from "mongoose";

const bookedPackages = mongo.Schema({
    packageName : {
        type : mongo.Types.ObjectID,
        ref : 'packageDetails'
    },
    dates : [{
        type : Date,
        required : true
    }],
    bookedBy : [{
        type : mongo.Types.ObjectID,
        ref : 'Users'
    }]
});

// module.exports = mongo.model('BookedPackages' , bookedPackages);

export const BookedPackages = mongo.model('BookedPackages' , bookedPackages);
