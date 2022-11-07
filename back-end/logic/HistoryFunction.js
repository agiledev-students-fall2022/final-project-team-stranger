const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

function downsort(response,name){
    const ret=response.sort((a,b)=>(b[name].localeCompare(a[name])));
    return ret;
}

router.get("/history", async (req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const apiResponse = await axios.get(
          "https://my.api.mockaroo.com/history?key=b402e590"
        )
    
        const responseData = apiResponse.data

        responseData=downsort(responseData,"time");
    
        // send the data in the response
        res.json(responseData)
      } catch (err) {
        // send an error JSON object back to the browser
        res.json(err)
      }
})
