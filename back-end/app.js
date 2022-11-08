import * as dotenv from 'dotenv'; 
dotenv.config({
    silent: true 
}); 

import express from "express"; 
import morgan from "morgan";
import mongoose from "mongoose";
import User from "./models/User.js"; 
import Message from "./models/Message.js";

import settingsRouter from './logic/SettingsRouter.js';

// FOR LATER - connect to database
// mongoose
//   .connect(`${process.env.DB_CONNECTION_STRING}`)
//   .then(data => console.log(`Connected to MongoDB`))
//   .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

const app = express(); 
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.use("/", settingsRouter); 

app.get("/", (req, res) => {
    res.send(`
    Hello world! <br>
    The backend is currently up and running! <br>
    Your .env file is currently ${process.env.TEST ? '' : 'NOT'} setup properly!
    `); 
})


export default app; 