const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId : {
        type : String, 
        required : true, 
        unique : true
    }, 

    username : {
        type : String, 
        required : true
    }, 

    password : {
        type : String,
        required : true
    },

    email : {
        type : String, 
        required : true, 
        lowercase : true, 
        minLength : 10, 
        unique : true
    },

    createdAt : {
        type: Date,
        default : () => {
            return Date.now();
        }
    }, 

    updatedAt : {
        type : Date, 
        default : () => {
            return Date.now();
        }
    }
})

module.exports = mongoose.model('User', userSchema);