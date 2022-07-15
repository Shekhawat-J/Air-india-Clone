const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
    id:{
        type : Number, 
        require: true
    }, 
    airLine:{
        type: string, 
        require : true
    }, 
    departureTime:{
        type : string, 
        require : true
    }, 
    arrivalTime:{
        type : string, 
        require : true
    }, 
    duration:{
        type : Number, 
        require : true
    }, 
    departureAirport : {
        type: string, 
        require : true, 
    }, 
    arrivalAirport : {
        type : string, 
        require : true
    }, 
    price : {
        type : Number, 
        require : true
    }, 
    bordingGate : {
        type : Number, 
    }, 
    createdAt : {
        type : Date, 
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date, 
        default : ()=>{
            return Date.now();
        }
    }
})


module.exports = mongoose.model('Flight', flightSchema);