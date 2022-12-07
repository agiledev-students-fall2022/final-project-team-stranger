const express = require("express");
const mongoose = require("mongoose");
const db = require("../models/db.js");
const User = mongoose.model("User");
const Message = mongoose.model("Message");

const { body, validationResult } = require("express-validator");

// let messages = [
//   "When my heart feels lonely, your spirit swiftly bonds me with love. You are my world.",
//   "Anytime I think of how much I have lost out, I smile because I've not lost out in finding that one Jewel so priceless and virtuous. You fill my world with blessings sweetheart.",
//   "I'll hug you all day if I could...",
// ];
// const mock_url = "https://my.api.mockaroo.com/messages?key=d685d830";
// const summary_url = "https://my.api.mockaroo.com/history?key=b402e590";

const messageRouter = express.Router();

//page protection route, no actual data fetched
messageRouter.post("/send-message/get", async (req, res) => {
  return res.status(200).json({
    status: "authenticated user",
  });
});

messageRouter.post(
  "/send-message/send",
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
      //create new message object
      const message = new Message({
        created_by: req.user._id, //user ID
        content: req.body.message,
        frequency: 0,
      });
      //save new message to db
      message.save((err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({
            errors: errors.array(),
            status: "Too many characters",
          });
        } else {
          console.log("Success!");
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

messageRouter.post("/messages", async (req, res) => {
  try {
    User.findOne({ _id: req.user._id })
      .populate("currentMessages")
      .populate("previousMessages")
      .exec((err, data) => {
        if (err) {
          console.log(err);
        } else {
          //when the user login for the first time
          //or when the messages need refreshment
          if (
            data.currentMessages.length == 0 ||
            data.lastRefreshDate.getDay() != new Date().getDay()
          ) {
            //move the current message to previous message, if any
            if (data.currentMessages.length != 0) {
              User.findOneAndUpdate(
                { _id: req.user._id },
                {
                  //use set instead of push to avoid duplicate addition (maybe due to duplicate post request)
                  $set: {
                    previousMessages: [
                      ...data.previousMessages.map((msg) => msg._id),
                      ...data.currentMessages.map((msg) => msg._id),
                    ],
                  },
                }
              ).exec((err, data) => {
                if (err) {
                  console.log(err);
                }
              });
            }
            //find three messages not created by current user and of least frequencies
            Message.find({ created_by: { $ne: req.user._id } }).exec(
              (err, strangerMessages) => {
                if (err) {
                  console.log(err);
                }
                strangerMessages.sort((a, b) => a.frequency - b.frequency);
                strangerMessages = strangerMessages.splice(0, 3);
                //increment the frequencies
                strangerMessages.forEach((msg) =>
                  Message.findOneAndUpdate(
                    { _id: msg._id },
                    {
                      $set: { frequency: msg.frequency + 1 },
                    }
                  ).exec((err, data) => {
                    if (err) {
                      console.log(err);
                    }
                  })
                );
                let curMessages = strangerMessages.map((msg) => msg._id);
                //update the daily messages
                User.findOneAndUpdate(
                  { _id: req.user._id },
                  {
                    $set: {
                      currentMessages: curMessages,
                    },
                    $currentDate: {
                      lastRefreshDate: true,
                    },
                  }
                ).exec((err, data) => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            );
          }
          //else, do nothing
        }
      });

    User.findOne({ _id: req.user._id })
      .populate("currentMessages")
      .populate("previousMessages")
      .exec((err, data) => {
        if (err) {
          console.log(err);
        } else {
          Message.find({ created_by: req.user._id }).exec(
            (err, sentMessages) => {
              if (err) {
                console.log(err);
              }
              //get current messages
              const dailyMessages = data.currentMessages.map(
                (msg) => msg.content
              );

              //get total influence by summing up frequencies of messages sent by the current user
              let totalViews = sentMessages.reduce((accumulator, object) => {
                return accumulator + object.frequency;
              }, 0);

              //get highlight
              let lastMessage;
              //no highlight for the first day
              if (data.previousMessages.length == 0) {
                lastMessage = "No highlights available";
              } else {
                lastMessage = data.previousMessages.pop().content;
              }
              //send response
              return res.status(200).json({
                messages: dailyMessages,
                view: totalViews,
                lastMessage: lastMessage,
                status: "all good",
              });
            }
          );
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
      status: "failed to retrieve messages from the database",
    });
  }
});

module.exports = messageRouter;
