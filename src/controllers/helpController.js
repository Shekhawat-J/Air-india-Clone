const helpDetails = (req, res) => {
    return res.status(200).send({
        message : "Successfully hitting the help api", 
        success : true, 
        data : {
            contact : "+91 9694916130"
        }
    })
}    


module.exports = {
    helpDetails
}