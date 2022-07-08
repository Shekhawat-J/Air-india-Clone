const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');


/**
 * Controller for signup/Registration
 */
exports.signup = async (req, res) => {

    const userObjToBeStoreInDB = {
        userId : req.body.userId, 
        username : req.body.username, 
        //password : req.body.password 
        password : bcrypt.hashSync(req.body.password, 8),
        email : req.body.email
    }

    /**
     * Insert this new user to the db
     */

    try{
        const userCreated = await User.create(userObjToBeStoreInDB);

        /**
         * Now we need to return the respose. but in the respose we will not 
         * return the password
         */
        const userCreatedResponse = {
            userId : userCreated.userId, 
            username : userCreated.username, 
            email : userCreated.email, 
            createdAt : userCreated.createdAt, 
            updatedAt : userCreated.updatedAt
        }

        res.status(201).send(userCreatedResponse);
    }
    catch(err){
        console.log("Error while inserting the user in the DB", err.message)
        res.status(500).send({
            message : "Internal error while inserting the user in DB"
        })
    }
}


/**
 * Controller for login
 */

exports.signin = async (req, res) => {
    
    //check whether the user present or not
    const user = await User.findOne({userId : req.body.userId});

    //if user does not exits
    if(user == null){
        return res.status(401).send({
            message : "Failed ! User id doesn't exits"
        })
    }

    //if user id present then we will match the password
    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if(!isValidPassword){
        return res.status(401).send({
            message : "Password is not valid"
        })
    }

    //Successfully logged In

    //We need to generate the access token 
    const token = jwt.sign({id:user.userId}, authConfig.secret, {expiresIn : 600} );
    const userResponse = {
        user : user.username,
        userId : user.userId, 
        email : user.email, 
        accessToken : token 

    }

    res.status(201).send(userResponse);
}