const express=require("express")
const StatsRouter = express.Router();
const axios=require("axios")
const mongoose = require("mongoose"); 
const db = require("../models/db.js")
const User = mongoose.model("User"); 
const Message = mongoose.model("Message"); 
StatsRouter.post("/stats", (req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
      const em=req.body.email;
      let apiResponse;
      User.
          find({email:em}).
          populate("currentMessages").
          exec((err,data)=>{
            if(err){
              console.log(err);
            }
            else{
              apiResponse=data[0].currentMessages
              res.json(apiResponse)
            }
          })
    } catch(err){
      console.log(err);
      res.json(err)
    }
})

module.exports = StatsRouter