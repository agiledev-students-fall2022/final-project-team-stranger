import * as dotenv from 'dotenv'; 
import axios from 'axios';

dotenv.config({
    silent: true 
}); 

import express from "express"; 
import morgan from "morgan";
import mongoose from "mongoose";
import User from "./models/User.js"; 
import Message from "./models/Message.js";

// FOR LATER - connect to database
// mongoose
//   .connect(`${process.env.DB_CONNECTION_STRING}`)
//   .then(data => console.log(`Connected to MongoDB`))
//   .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

const app = express(); 
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data


app.get("/", (req, res) => {
    res.send(`
    Hello world! <br>
    The backend is currently up and running! <br>
    Your .env file is currently ${process.env.TEST ? '' : 'NOT'} setup properly!
    `); 
})

export function downsort(response,name){
    const ret=response.sort((a,b)=>(b[name].localeCompare(a[name])));
    return ret;
}

app.get("/history", async (req,res) =>{
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

app.get("/stats", (req,res) =>{
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

export default app; 