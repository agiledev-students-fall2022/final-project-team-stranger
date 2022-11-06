const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get("/stats", (req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    const response=axios
    .get("https://my.api.mockaroo.com/stats?key=d685d830")
    .then(apiResponse => res.json(apiResponse.data))
    .catch (err => 
        res.json({
          success: false,
          error: err,
        })
    )
})