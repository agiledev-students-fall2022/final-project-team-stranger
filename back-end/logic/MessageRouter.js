const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const db = require("../models/db.js");
const User = mongoose.model("User");
const Message = mongoose.model("Message");

const { body, validationResult } = require("express-validator");

let messages = [
  "When my heart feels lonely, your spirit swiftly bonds me with love. You are my world.",
  "Anytime I think of how much I have lost out, I smile because I've not lost out in finding that one Jewel so priceless and virtuous. You fill my world with blessings sweetheart.",
  "I'll hug you all day if I could...",
];
// const mock_url = "https://my.api.mockaroo.com/messages?key=d685d830";
// const summary_url = "https://my.api.mockaroo.com/history?key=b402e590";

const messageRouter = express.Router();
messageRouter.post(
  "/send-message",
  //Validate before storing: maximum 250 characters
  body("message").isLength({ max: 250 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        status: "Too many characters",
      });
    }
    // try to save the message to the database
    try {
      //const cur_user = await User.findOne({ email: req.body.email });
      const cur_user = await User.findOne({ email: "yz6790@nyu.edu" });
      const message = new Message({
        created_by: cur_user._id, //user ID
        content: req.body.message,
        frequency: 0,
      });
      message.save((err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log("Success!");
        }
      });
      cur_user
        .update({
          $push: { currentMessages: message._id },
        })
        .exec((err, data) => {
          if (err) {
            console.error(err);
            throw err;
          } else {
            console.log(data);
          }
        });
      return res.json({
        message: req.body.message, // return the message we just saved
        status: "New message saved to the database successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: err,
        status: "Failed to save the message to the database",
      });
    }
  }
);

messageRouter.get("/messages", async (req, res) => {
  // load all messages from database
  try {
    const cur_user = User.findOne({ email: "yz6790@nyu.edu" });
    // const messages = await Message.find({});
    //const apiResponse = await axios.get(mock_url);
    //static test
    res.json({
      //messages: apiResponse.data,
      messages: messages,
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

messageRouter.get("/summary", async (req, res) => {
  let apiResponse, lastMessage, totalViews;
  try {
    const cur_user = User.findOne({ email: "yz6790@nyu.edu" });

    cur_user
      .populate("previousMessages")
      .populate("currentMessages")
      .exec((err, data) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          apiResponse = data.currentMessages;
          totalViews = apiResponse.reduce((accumulator, object) => {
            return accumulator + object.frequency;
          }, 0);
          lastMessage = data.previousMessages.pop().content;
          res.json({
            view: totalViews,
            lastMessage: lastMessage,
            //lastMessage: "test last message",
            status: "all good",
          });
        }
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
