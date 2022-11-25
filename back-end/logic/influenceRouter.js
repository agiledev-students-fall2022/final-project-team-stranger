const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const db = require("../models/db.js");
const User = mongoose.model("User");
const Message = mongoose.model("Message");

const influenceRouter = express.Router();

influenceRouter.post("/summary", async (req, res) => {
    // load all messages from database
    try{
        const ref=req.user._id;
        Message.
          find({created_by:ref}).
          exec((err,data)=>{
              if(err)
              {
                console.log(err);
              }
              else
              {
                const totalViews = data.reduce((accumulator, object) => {
                    return accumulator + object.frequency;
                  }, 0);
                
                res.json(totalViews);
              }
            }
          )
      } catch(err){
        console.log(err);
        res.json(err)
      }
  });

  module.exports=influenceRouter