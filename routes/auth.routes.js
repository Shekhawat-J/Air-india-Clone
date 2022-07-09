/**
 * This file will act as the route for the authentication and authorization
 */

const authController = require('../controllers/auth.controller');
const {verifySignUp} = require('../middlewares')

module.exports = (app) => {
    
    app.post("/aic/api/v1/auth/signup", [verifySignUp.verifySingUpRequest] ,authController.signup);
    
    app.post("/aic/api/v1/auth/signin", authController.signin);
}