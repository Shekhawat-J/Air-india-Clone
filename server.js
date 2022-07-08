const express = require("express");
const dbConfig = require("./configs/db.config");
const mongoose = require("mongoose");
const serverConfig = require("./configs/server.config");
var bodyParser = require('body-parser')

const app = express();
//const PORT = 3000;

//to use the body parser on it full potential
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.status(200);
    //res.send("Hello for get");
    res.send({
        success : true, 
        message : "Successfully hitting the api",
        data : {}
    })
})

//connection app to mongodb using mongoose
mongoose.connect(dbConfig.DB_URL, () => {
    console.log("Connected to MongoDB");
}, (err) => {
    console.log("Error", err.message);
})

require('./routes/auth.routes')(app);
require('./routes/auth.routes')(app);

app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the PORT: ", serverConfig.PORT);
})