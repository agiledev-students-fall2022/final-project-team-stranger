const express = require("express")
const StatsRouter = express.Router();
const mongoose = require("mongoose"); 
const db = require("../models/db.js")
const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 

StatsRouter.post("/stats",  async (req,res) =>{
  try{
    const ref = req.user._id;
    Message.
      find({created_by:ref}).
      exec((err,data)=>{
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.json(data);
        }
      }
      )
  } catch(err){
    console.log(err);
    res.json(err)
  }
})

module.exports = StatsRouter