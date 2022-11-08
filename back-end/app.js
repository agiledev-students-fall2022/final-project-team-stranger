const dotenv = require('dotenv'); 
const axios = require('axios');

dotenv.config({
    silent: true 
}); 

const express=require("express")
const morgan=require("morgan")
const mongoose =require ("mongoose");
const User = require("./models/User.js"); 
const Message = require("./models/Message.js");
const HistoryRouter =require( './logic/HistoryFunction.js');
const StatsRouter =require('./logic/StatsFunction.js');

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

app.use("/",HistoryRouter)

app.use("/",StatsRouter)



module.exports=app