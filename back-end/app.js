
const express = require("express")
const morgan = require("morgan")
const HistoryRouter = require( './logic/HistoryFunction.js');
const StatsRouter = require('./logic/StatsFunction.js');
const settingsRouter = require("./logic/settingsRouter.js");
const messageRouter = require("./logic/MessageRouter.js");
const cors = require("cors");
const mongoose = require ("mongoose");
const db = require("./models/db.js")

const dotenv = require("dotenv");
dotenv.config({
  silent: true,
});


const app = express();
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })); // log all incoming requests
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(cors());

app.use("/", settingsRouter); 
app.use("/", messageRouter);
app.use("/", HistoryRouter)
app.use("/", StatsRouter)

app.get("/", (req, res) => {
  res.send(`
    Hello world! <br>
    The backend is currently up and running! <br>
    Your .env file is currently ${process.env.TEST ? '' : 'NOT'} setup properly!
    `); 
})


module.exports = app; 
