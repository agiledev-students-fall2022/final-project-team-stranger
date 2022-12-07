const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./models/db.js");
const authPassport = require("./logic/authPassport.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();

// Env Vars
const dotenv = require("dotenv");
dotenv.config({
  silent: true,
});

// Register Auth
app.use(passport.initialize());
const { jwtOptions, jwtStrategy } = require("./logic/authPassport");
passport.use("strangerLogin", jwtStrategy);

// Routers
const authRouter = require("./logic/authRouter.js");
const privateRoutes = require("./logic/privateRoutes.js");
const HistoryRouter = require("./logic/HistoryFunction.js");
const StatsRouter = require("./logic/StatsFunction.js");
const SettingsRouter = require("./logic/SettingsRouter.js");
const messageRouter = require("./logic/MessageRouter.js");
const SidebarRouter = require("./logic/sidebarRouter.js");
const influenceRouter = require("./logic/influenceRouter.js");

// Middleware
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })); // log all incoming requests
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })); // allow incoming requests only from a "trusted" host
app.use(cookieParser()); // useful middleware for dealing with cookies

// Sample Endpoint 
app.get("/", (req, res) => {
  res.send(`
    Hello world! <br>
    The backend is currently up and running! <br>
    Your .env file is currently ${process.env.TEST ? "" : "NOT"} setup properly!
    `);
});

// Register Auth
app.use("/", authRouter); 

// Add all other routers 
app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), HistoryRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), messageRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), StatsRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), privateRoutes);
  
app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), settingsRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), SidebarRouter);

app.use("/", passport.authenticate("strangerLogin", {
  session: false, failureRedirect: "/authFail"}), influenceRouter);

module.exports = app;
