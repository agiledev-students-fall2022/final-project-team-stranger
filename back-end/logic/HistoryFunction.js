const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get("/history", async (req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const apiResponse = await axios.get(
          "https://my.api.mockaroo.com/history?key=b402e590"
        )
    
        const responseData = apiResponse.data

        responseData.sort((a,b)=>(b["time"].localeCompare(a["time"])))
    
        // send the data in the response
        res.json(responseData)
      } catch (err) {
        // send an error JSON object back to the browser
        res.json(err)
      }
})
