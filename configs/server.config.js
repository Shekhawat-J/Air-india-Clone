const dotenv = require("dotenv");

if(process.env.NODE_ENV != 'production'){

    dotenv.config();
}

module.exports = {
    PORT : process.env.PORT
}