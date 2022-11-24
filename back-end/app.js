const express = require("express")
const morgan = require("morgan")
const cors = require("cors");
const mongoose = require ("mongoose");
const db = require("./models/db.js"); 
const authPassport = require("./logic/authPassport.js")
const cookieParser = require("cookie-parser")

// Auth 
const jwt = require("jsonwebtoken")
const passport = require("passport")

const app = express();
app.use(passport.initialize()) 

// Env Vars 
const dotenv = require("dotenv");
dotenv.config({
  silent: true,
});

// Register Auth 
const { jwtOptions, jwtStrategy } = require("./logic/authPassport") 
passport.use("strangerLogin", jwtStrategy)

// Routers 
const authRouter = require("./logic/authRouter.js"); 
const privateRoutes = require("./logic/privateRoutes.js"); 
const HistoryRouter = require( './logic/HistoryFunction.js');
const StatsRouter = require('./logic/StatsFunction.js');
const settingsRouter = require("./logic/settingsRouter.js");
const messageRouter = require("./logic/MessageRouter.js");
const SidebarRouter = require("./logic/sidebarRouter.js");

// Middleware 
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })); // log all incoming requests
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })) // allow incoming requests only from a "trusted" host
app.use(cookieParser()) // useful middleware for dealing with cookies

// Register Auth/Protected Routes 
app.use("/", authRouter); 
app.use("/", messageRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: '/authFail'}), HistoryRouter);

// Register All Other Routes 
app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: '/authFail'}), StatsRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: '/authFail'}), privateRoutes);
  
// Register All Other Routes 
app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: '/authFail'}), settingsRouter);
  app.use("/", passport.authenticate("strangerLogin", {
    session: false, failureRedirect: '/authFail'}), SidebarRouter);

// Sample Endpoint 
app.get("/", (req, res) => {
  res.send(`
    Hello world! <br>
    The backend is currently up and running! <br>
    Your .env file is currently ${process.env.TEST ? '' : 'NOT'} setup properly!
    `); 
})

module.exports = app; 