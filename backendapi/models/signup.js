const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const signupSchema = new Schema({
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
    verifyToken: {
        type: String
    }
})

// newUserSchema.methods.verifyUser = function(userID){
        
// }

module.exports = mongoose.model('signupUser', signupSchema);


