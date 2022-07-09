/**
 * this file will contain the custom middle ware for verifying the 
 * request body 
 * 
 * below next will use the pass the control to next middle ware or next controller
 * 
 */
const User = require('../models/user.model');

exports.verifySingUpRequest = async (req, res, next) => {

    if(!req.body.username){
        return res.status(400).send({
            message : "Failed ! Please provide the username"
        })
    }

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! Please provide the user Id"
        })
    }

    //We need to check whether the user Id already present or not
    const user = await User.findOne({userId : req.body.userId});

    if(user != null){
        return res.status(400).send({
            message : "User ID already present. Please provide deifferent user Id"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! please provide the password"
        })
    }

    //checking whether the given password is strong or not
    //  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    //let strongPassword = new RegExp("^(?=.*[a-z])(?=.[A-Z])(?=.*[0-9])(?=.*[^A-Zz-z0-9])(?=.{8,})");
    let strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if(!strongPassword.test(req.body.password)){
        return res.status(400).send({
            message : `Failed! Please enter the strong password 
                        1. At least one lowercase later 
                        2. At least one Upercase later
                        3. At least one Special later
                        4. At least 8 charactor long
                        5. At least one digit
                        `
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            message : "Failed! Please provide the email Id"
        })
    }

    //we will checkc whether the given email is valid or not

    //   [a-z0-9]+@[a-z]+\.[a-z]{2,3}

    //    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})
    let validEmail = new RegExp("(?=.[a-z0-9]+[@]{1}[a-z]+[\.]{1}[a-z]{2,3})")

    if(!validEmail.test(req.body.email)){
        return res.status(400).send({
            message : "Failed! Kindly entered the valid email address"
        })
    }

    /**
     * We have mentioned that email should be unique in the database 
     * so we need to check whether the email already present or not 
     */

    const email = await User.findOne({email : req.body.email});

    if(email != null){
        return res.status(400).send({
            message : "Failed! Email address already present. Kindly use the different email address"
        })
    }

    next();
}