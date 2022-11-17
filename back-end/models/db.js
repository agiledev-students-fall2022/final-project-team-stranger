const User = require("./User.js");
const Message = require("./Message.js");
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  silent: true,
});

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

