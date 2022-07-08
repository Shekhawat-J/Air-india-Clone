/**
 * This file will act as the route for the authentication and authorization
 */

const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    
    app.post("/aic/api/v1/auth/signup", authController.signup);
    
    app.get("/aic/api/v1/auth/signin", authController.signin);
}