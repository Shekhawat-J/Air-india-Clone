const Flight = require('../models/fligth.model');


//creating the flight
exports.createFlight = async (req, res) => {
        const flight = await Flight.findOne({id : req.body.id});
        if(flight != NULL){
            return res.status(400).send({
                message : "Flight details alread avilable"
            })
        }
        const flightDetails = {
            id : req.body.id, 
            airLine : req.body.airLine, 
            departureTime : req.body.departureTime,
            arrivalTime : req.body.arrivalTime,
            duration : req.body.duration,
            departureAirport : req.body.departureAirport,
            arrivalAirport : req.body.arrivalAirport,
            price : req.body.price,
            bordingGate : req.body.bordingGate  
        }

        try {
            const flightCreated = await Flight.create(flightDetails);
            const flightCreationResponse = {
                id : req.body.id, 
                airLine : req.body.airLine, 
                departureTime : req.body.departureTime,
                arrivalTime : req.body.arrivalTime,
                duration : req.body.duration,
                departureAirport : req.body.departureAirport,
                arrivalAirport : req.body.arrivalAirport,
                price : req.body.price,
                bordingGate : req.body.bordingGate  
            }

            res.status(200).send(flightCreationResponse);
        } catch (err) {
            console.log("Error : while inserting the flight details in the DB", err.message);
            res.status(500).send({
                message : "Internal error while inserting the flight details in the DB"
            })
        }
}

//delete flight
exports.deleteFlight = async (req, res) => {
    const flightId = req.params.id;

    const flight = await Flight.findOne({id : flightId});

    if(flight == NULL){
        res.status(400);
        res.send({
            success : false, 
            message : "The given flight Id it not avialbe in Db",
        })
    }

    try {
        const flightDeleted = await Flight.deleteOne({id : flightId})

        res.status(200);
        res.send({
            success : true, 
            message : "Successfully deleted the flight details", 
            data : {flightDeleted}
        })
    } catch (err) {
        console.log("Error while deleting the flight details");
        res.status(401).send({
            message : "Internal error while deleting the flight details "

        })
    }
}


//get the flight by Id 
exports.getFlight = async (req, res) =>{
    const flightId = req.params.id;

    const flight = await Flight.findOne({id : flightId});

    if(flight == NULL){
        res.status(400).send({
            success : False, 
            message : "Flight with the Given flight id is not avialable"
        })
    }

    res.status(200).send({
        success : true, 
        message : "Successfully Hitting the API and flight found", 
        data : {flight}
    })
}

//get all the flight 
exports.getAllFlight = async (req, res) =>{

    try {
        const flights = await Flight.find().sort('price');
        res.status(200).send({
            success : true, 
            message : "Successfully fetch all flight", 
            data : {flights}
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success : false, 
            message : "Something wend Wrong", 
            data : {err}
        })
    }
}

//searching the flight based on price and based on duration

