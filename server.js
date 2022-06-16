const express = require("express"); //this package returns a function using which we can initiate a new express application 
const app = express(); // execuing the function returned a new express application
const apiRouter = require("./src/routes/index");

app.use("/api", apiRouter);
//localhost:3000/api/v1/help

app.get('/', (req, res) => {
    res.status(200);
    //res.send("Hello World");

    //sending JSON as response
    res.send({
        success : true, 
        message : 'Succesfully hitting the api', 
        data : {}
    });
});


app.listen(3000, () => {
    //this callback will be executed everytime the server starts
    console.log("Server started successfully");
})

