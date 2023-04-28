const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otherInfoSchema = mongoose.Schema({
    dob : {
        type: String
    },
    gender: {
        type: String
    },
    profilePicture:{
        type: String
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    emailVerification: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    },
    otherInfo: otherInfoSchema
})

// newUserSchema.methods.verifyUser = function(userID){
        
// }

module.exports = mongoose.model('user', userSchema);


