const express = require("express");
const router = express.Router();


const v1Routes = require("./v1");

//Any request come with v1 will map to v1Routes 
router.use("/v1", v1Routes);


module.exports = router;