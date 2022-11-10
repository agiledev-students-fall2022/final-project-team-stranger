const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
// import Message from "../models/Message.js";
// import User from "../models/User.js";

// let messages = [
//   "When my heart feels lonely, your spirit swiftly bonds me with love. You are my world.",
//   "Anytime I think of how much I have lost out, I smile because I've not lost out in finding that one Jewel so priceless and virtuous. You fill my world with blessings sweetheart.",
//   "I'll hug you all day if I could...",
// ];
const mock_url = "https://my.api.mockaroo.com/messages?key=d685d830";
const summary_url = "https://my.api.mockaroo.com/history?key=b402e590";

const messageRouter = express.Router();
messageRouter.post("/send-message", async (req, res) => {
  // try to save the message to the database
  try {
    // const message = await Message.create({
    //   created_by: "0", //user ID
    //   content: req.body.message,
    //   frequency: 0,
    // });
    return res.json({
      message: req.body.message, // return the message we just saved
      status: "all good",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: "failed to save the message to the database",
    });
  }
});

messageRouter.get("/messages", async (req, res) => {
  // load all messages from database
  try {
    // const messages = await Message.find({});
    const apiResponse = await axios.get(mock_url);
    //static test
    res.json({
      messages: apiResponse.data,
      status: "all good",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: "failed to retrieve messages from the database",
    });
  }
});

// a route to handle fetching a single message by its id
messageRouter.get("/summary", async (req, res) => {
  // load all messages from database
  const apiResponse = await axios.get(summary_url);
  const responseData = apiResponse.data;
  const lastMessage = responseData[0].text;
  const totalViews = responseData.reduce((accumulator, object) => {
    return accumulator + object.score;
  }, 0);
  try {
    //const messages = await Message.find({ _id: req.params.messageId });
    res.json({
      view: totalViews,
      lastMessage: lastMessage,
      status: "all good",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: "failed to retrieve messages from the database",
    });
  }
});

module.exports = messageRouter;
