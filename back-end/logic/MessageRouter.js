import app from "../app";
import express from "express";
import Message from "./models/Message.js";
import User from "./models/User.js";

app.post("/message/upload", async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      created_by: "0", //user ID
      content: req.body.message,
      frequency: 0,
    });
    return res.json({
      message: message, // return the message we just saved
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

app.get("/messages", async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({});
    res.json({
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

// a route to handle fetching a single message by its id
app.get("/messages/:messageId", async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId });
    res.json({
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
